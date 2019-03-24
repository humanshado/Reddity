import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, upVotePost, downVotePost, editPost, deletePost, deleteChildComments } from '../actions';
import * as moment from 'moment';
import sortBy from 'sort-by';
import ListCategories from './ListCategories';


class CategoryPosts extends Component {
    constructor(props){
        super(props);

        this.state = {
            sortOption: "timestamp",
            isCategoryActive: false,
            activeCategory: ""
        }
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    toggleCategory = () => {
        if((this.state.isCategoryActive && this.state.activeCategory === "all") ||
            (!this.state.isCategoryActive && this.state.activeCategory !== "all")){
                this.setState({
                    isCategoryActive: !this.state.isCategoryActive
                });
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props !== nextProps){
            this.setState({
                activeCategory: nextProps.activeCategory
            }, (state) => {
                this.toggleCategory();
            })
        }
    }

    handleDeletePost = (id) => {
        this.props.deletePost(id);
        this.props.deleteChildComments(id);
    }

    handleUpVotePost = (id) => {
        this.props.upVotePost(id);
    }

    handleDownVotePost = (id) => {
        this.props.downVotePost(id);
    }

    changeRoute = (post) => {
        const { history } = this.props
        history.push(`/posts/edit/${post.id}`, {post} )
    }

    updateSort = (e) => {
        if (this.props.posts) {
            this.setState({
                sortOption: this.props.posts.sort(sortBy(e.target.value))
            })
        }
    }

    renderPosts = (posts) => {
        return this.props.posts && posts.map((post) => {
            return (<div className="panel panel-default" key={post.id}>
                        <div className="panel-body">
                            <li className="posts-wrapper">
                                <div className="voting-arrows pull-left hidden-xs hidden-sm">
                                    <p><i class="fa fa-chevron-circle-up 3x" onClick={() => this.handleUpVotePost(post.id)}></i></p>
                                    <p><i class="fa fa-chevron-circle-down 3x" onClick={() => this.handleDownVotePost(post.id)}></i></p>
                                </div>
                                <div className="pull-left">
                                    <span style={{"color": "blue"}}><i className="fa fa-book" aria-hidden="true"></i> {post.category}</span>
                                    <Link to={`/${post.category}/${post.id}`}>
                                        <h4><strong>{post.title}</strong></h4>
                                    </Link>
                                    posted by:<span style={{"color" : "red"}}><i className="fa fa-user-circle" aria-hidden="true"></i> <strong>{post.author}</strong></span> |
                                    <span className="text-muted">{ moment(post.timestamp).fromNow()}</span> |
                                    comments: <span className="badge badge-primary">{post.commentCount}</span>
                                | votes: <span className="upVote" onClick={() => this.handleUpVotePost(post.id)}><i className="fa fa-heart" aria-hidden="true"></i></span>
                                <span className="downVote" onClick={() => this.handleDownVotePost(post.id)}><i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                                    <span>{post.voteScore}</span>
                                </div>
                                <div className="pull-right btn-group">
                                    <span className="edit" onClick={() => this.changeRoute(post)}><i className="fa fa-pencil" aria-hidden="true"></i></span>
                                    <span className="delete" onClick={() => this.handleDeletePost(post.id)}><i className="fa fa-trash" aria-hidden="true"></i></span>
                                </div>
                            </li>
                        </div>
                    </div>

            )
        });
    }

    //This function was adopted from the official redux documentation with slight modifications
    getVisiblePosts = (posts, activeCategory) => {
        switch (activeCategory) {
            case 'all':
                return posts
            case 'politics':
                return posts.filter(post => post.category === activeCategory)
            case 'education':
                return posts.filter(post => post.category === activeCategory)
            case 'sports':
                return posts.filter(post => post.category === activeCategory)
            case 'lifestyle':
                return posts.filter(post => post.category === activeCategory)
            case 'health':
                return posts.filter(post => post.category === activeCategory)
            default:
                return posts
        }
    }


    render(){
        let posts = this.getVisiblePosts(this.props.posts, ...this.state.activeCategory);

        return (
            <div>
                {this.state.isCategoryActive
                ?   <div className="col-xs-12 col-md-10 main-blog">
                        <ul>
                            {this.renderPosts(posts)}
                        </ul>
                    </div>
                :   <div className="col-xs-12 col-md-10 main-blog">
                        <ul>
                            {this.renderPosts(posts)}
                        </ul>
                    </div>
                }
                <span className="col-md-2 sort-group">
                    <h5 className="text-muted">Sort by:</h5>
                    <select value={this.state.sortOption} onChange={(e) => this.updateSort(e)}>
                        <option value="timestamp">Date</option>
                        <option value="voteScore">Popularity</option>
                    </select>
                </span>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
            posts: Object.values(state.posts),
            activeCategory: Object.values(state.categories).filter(c => c.isActive === true ).map(c1 => c1.name)

    }
}

export default connect(
    mapStateToProps,
    { fetchPosts, upVotePost, downVotePost, editPost, deletePost, deleteChildComments }
)(CategoryPosts);