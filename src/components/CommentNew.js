import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
import { Field, reduxForm } from 'redux-form';
import uuidv4 from 'uuid/v4';
import { addComment } from '../actions';

class CommentsNew extends Component {
    
    submitNewComment = (values) => {
        this.props.addComment({
            ...values,
            id: uuidv4(),
            parentId: this.props.parentId,
            timestamp: Date.now(),
            voteScore: 0,
            deleted: false,
            parentDeleted: false
        })
        this.props.reset();
    }

    render() {
        console.log('props in CommentsNew.js ', this.props);
        const { handleSubmit, pristine, submitting } = this.props;

        return (
                <form className="form-inline" onSubmit={handleSubmit(this.submitNewComment)}>
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
    return bindActionCreators({ addComment }, dispatch);
}

CommentsNew = reduxForm({
    form: "addNewCommentForm",
    fields: ['author', 'body']
})(CommentsNew);

export default CommentsNew;
