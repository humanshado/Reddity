import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, getFormValues, isDirty, isPristine } from 'redux-form';
import { editComment } from '../actions';

class CommentsEdit extends Component {
    constructor(props){
        super(props);

        this.state = {
            comment: this.props.selectedComment
        }

        this.submitEditedComment = this.submitEditedComment.bind(this);
    }

    componentWillReceiveProps = (nextProps) => {
        console.log('nextProps in CommentsEdit ', nextProps);
        if(this.props.selectedComment.id === nextProps.selectedComment.id){
            if(this.props.selectedComment.author !== nextProps.selectedComment.author){
                this.setState({ comment: nextProps.selectedComment})
            }
            if (this.props.selectedComment.body !== nextProps.selectedComment.body) {
                this.setState({ comment: nextProps.selectedComment })
            }
        }
    }


    submitEditedComment = (values) => {
        console.log('values in submitEditedComment ', values);
        const { comment } = this.state;
        this.props.editComment({
            ...values,
            id: comment.id,
            parentId: comment.parentId,
            timestamp: comment.timestamp,
            votescore: comment.voteScore,
            deleted: false,
            parentDeleted: false
        })

        this.props.reset();
        this.props.toggleEdit(true, comment);
    }

    render() {
        console.log('props in CommentsEdit.js ', this.props);
        const { handleSubmit, pristine, submitting } = this.props;

        return (
            <form className="form-inline" onSubmit={handleSubmit(this.submitEditedComment)}>
                <div className="form-group">
                    <label htmlFor="author">Name:</label>
                    <Field name="author" component="input" type="text" className="form-control" placeholder="enter your name" />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Comment:</label>
                    <Field name="body" component="input" type="textarea" id="comment-box" className="form-control" placeholder="write your comments here..." />
                </div>
                <button type="submit" className="btn btn-default" style={{ "display": "none" }} disabled={pristine || submitting} >Submit</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editComment }, dispatch);
}

CommentsEdit = reduxForm({
    form: "editCommentForm",
    fields: ['author', 'body']
})(CommentsEdit);

CommentsEdit = connect(
    state => ({
        values: getFormValues('editCommentForm'),
        dirty: isDirty('editCommentForm'),
        pristine: isPristine('editCommentForm')
    }),
    mapDispatchToProps
)(CommentsEdit);

export default CommentsEdit;
