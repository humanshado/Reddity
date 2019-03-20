import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
import { getFormValues, isDirty, isPristine } from 'redux-form';
import { addComment, editComment, upVoteComment, downVoteComment, deleteComment } from '../actions';
import CommentsNew from './CommentNew';
import CommentsEdit from './CommentEdit';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            selectedComment: {}
        }
    }

    handleDeleteComment = (id) => {
        console.log('Comment to delete from Comment.js ', id)
        this.props.deleteComment(id);
    }

    toggleEdit = (comment, isEditing = this.state.isEditing) => {
        console.log('toggleEdit ', this.state.isEditing)
        console.log('selectedComment in toggleEdit ', comment)
        this.setState({
            isEditing: !this.state.isEditing,
            selectedComment: comment
        })
    }

    handleUpVoteComment = (id) => {
        this.props.upVoteComment(id)
    }

    handleDownVoteComment = (id) => {
        this.props.downVoteComment(id)
    }

    renderComments = () => {
        return this.props.comments.map((comment, index) => {
            return (
                <div key={index}>
                    <i className="fa fa-comment-o" aria-hidden="true"></i><h4>{comment.body}</h4>
                    <div>
                        by:<span className="text-muted">{comment.author}</span>
                        <span className="text-muted">{moment(comment.timestamp).fromNow()}</span>
                        | votes: <span className="upVote" onClick={() => this.handleUpVoteComment(comment.id)}><i className="fa fa-heart" aria-hidden="true"></i></span>
                        <span className="downVote" onClick={() => this.handleDownVoteComment(comment.id)}><i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                        <span className="text-muted">{comment.voteScore}</span>
                        <div className="pull-right btn-group">
                            <span className="edit" onClick={() => this.toggleEdit(comment)}><i className="fa fa-pencil" aria-hidden="true"></i></span>
                            <span className="delete" onClick={() => this.handleDeleteComment(comment.id)}><i className="fa fa-trash" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
            )
        })
    }


    render() {
        console.log('props in Comments.js ', this.props);
        return (
            <div className="comments-wrapper">
                <h5 className="text-muted">Comments</h5>
                {this.state.isEditing
                    ? <div style={{ "backgroundColor": "#F2F3F5", "padding": "20px", "borderRadius": "10px" }}>
                        <h5>Editing...</h5>
                        <CommentsEdit 
                            selectedComment={this.state.selectedComment}
                            editComment={this.props.editComment}
                            toggleEdit={this.toggleEdit}
                            initialValues={{
                                author: this.state.selectedComment.author,
                                body: this.state.selectedComment.body
                            }}
                        />
                    </div>
                    : <div style={{ "padding": "20px", "borderRadius": "10px" }}>
                        <h5>New...</h5>
                        <CommentsNew 
                            parentId={this.props.post.id}
                            addComment={this.props.addComment}
                        />
                    </div>
                }
                <hr />
                {this.props.comments && this.renderComments()}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addComment, editComment, upVoteComment, downVoteComment, deleteComment }, dispatch);
}

Comments = connect(
    null,
    mapDispatchToProps
)(Comments);

export default Comments;


