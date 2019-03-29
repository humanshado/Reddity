import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux';
import { fetchPost_request, fetchPost_success, fetchPost_failure, fetchComments, editPost, upVotePost, downVotePost, deletePost, deleteChildComments} from '../actions';
import * as moment from 'moment';
import Comments from './Comments';
import EditPost from './EditPost';
import PageNotFound from './PageNotFound';


class PostDetails extends Component {

    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.props.fetchPost_request(id);
        this.props.fetchComments(id);
    }

    handleDeletePost = async (id) => {
        console.log('Post to delete from PostList.js ', id)
        let d_comments = this.props.comments.filter(c => c.parentId === id);
        await this.props.deletePost(id);
        await this.props.deleteChildComments(id);
        this.props.history.push("/");
    }

    handleUpVotePost = (id) => {
        this.props.upVotePost(id);
    }

    handleDownVotePost = (id) => {
        this.props.downVotePost(id);
    }

    changeRoute = (post) => {
        console.log('post to edit in PostList ', post)
        const { history } = this.props
        history.push(`/posts/edit/${post.id}`, { post })
    }


    render() {
        console.log('props in render post details', this.props);
        console.log('comments in render post details', this.props.comments);
        let { id } = this.props.match.params;
        let post = this.props.posts && this.props.posts.filter(p => p.id === id)[0];
        console.log('post in render post details', post);
        let { title, author, body, category, timestamp, voteScore } = post;
        //let { isFetching } = this.props.post;
        let p_comments = this.props.comments.filter(c => c.parentId === id);
        console.log('p_comments', p_comments);
        let commentCount = p_comments.length;
        return (
            <div>

                {_.isEmpty(this.props.posts) && <div><PageNotFound /></div>}

                <div className="post-details">
                    <div className="row">
                        <div className="col-xs-12 pull-left">
                            <span style={{ "color": "blue" }}><i className="fa fa-book" aria-hidden="true"></i> {category}</span>
                            <h4><strong>{title}</strong></h4>
                            posted by:<span style={{ "color": "red" }}><i className="fa fa-user-circle" aria-hidden="true"></i> <strong>{author}</strong></span> |
                                <span className="text-muted">{moment(timestamp).fromNow()}</span> |
                                    comments: <span className="badge badge-primary">{commentCount}</span>
                            | votes: <span className="upVote" onClick={() => this.handleUpVotePost(id)}><i className="fa fa-heart" aria-hidden="true"></i></span>
                            <span className="downVote" onClick={() => this.handleDownVotePost(id)}><i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                            <span>{voteScore}</span>
                            <div className="pull-right btn-group">
                                <span className="edit" onClick={() => this.changeRoute(post)}><i className="fa fa-pencil" aria-hidden="true"></i></span>
                                <span className="delete" onClick={() => this.handleDeletePost(id)}><i className="fa fa-trash" aria-hidden="true"></i></span>
                            </div>
                            <hr /><p>{body}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xs-12">
                            <Comments
                                p_comments={p_comments}
                                post={post}
                                {...this.props}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: Object.values(state.posts),
        comments: Object.values(state.comments)
    }
}

export default connect(
    mapStateToProps,
    { fetchPost_request, fetchPost_success, fetchPost_failure, fetchComments, editPost, upVotePost, downVotePost, deletePost, deleteChildComments }
)(PostDetails);