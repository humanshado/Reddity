import {
    SET_CATEGORY_FILTER,
    FETCH_CATEGORIES,
    FETCH_POSTS,
    UPVOTE_POST,
    DOWNVOTE_POST,
    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE,
    FETCH_COMMENTS,
    ADD_COMMENT,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    DELETE_CHILD_COMMENTS,
    EDIT_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DELETE_COMMENT
} from './constants';


export function setCategoryFilter(...allCategories){
    console.log('AllCategories dispatched from actions ', allCategories);
    return {
        type: SET_CATEGORY_FILTER,
        payload: allCategories
    }
}

export function fetchCategories() {
    return {
        type: FETCH_CATEGORIES
    }
}

export function fetchPosts() {
    return {
        type: FETCH_POSTS
    }
}

export function fetchPost_request(id) {
        return {
            type: FETCH_POST_REQUEST,
            payload: id
        }
}

export function fetchPost_success(id, json) {
    return {
        type: FETCH_POST_SUCCESS,
        id,
        json
    }
}

export function fetchPost_failure(id, error) {
    return {
        type: FETCH_POST_FAILURE,
        id,
        error
    }
}

export function addPost(newPost){
    return {
        type: ADD_POST,
        payload: newPost
    }
}

export function editPost(post) {
    return {
        type: EDIT_POST,
        payload: post
    }
}

export function deletePost(id){
    return {
        type: DELETE_POST,
        payload: id
    }
}

export function upVotePost(id){
    return {
        type: UPVOTE_POST,
        payload: id
    }
}

export function downVotePost(id) {
    return {
        type: DOWNVOTE_POST,
        payload: id
    }
}

export function fetchComments(postId){
    return {
        type: FETCH_COMMENTS,
        payload: postId
    }
}

export function addComment({...comment}){
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

export function editComment(comment){
    return {
        type: EDIT_COMMENT,
        payload: comment
    }
}

export function upVoteComment(commentId){
    return {
        type: UPVOTE_COMMENT,
        payload: commentId
    }
}

export function downVoteComment(commentId){
    return {
        type: DOWNVOTE_COMMENT,
        payload: commentId
    }
}

export function deleteComment(commentId){
    return {
        type: DELETE_COMMENT,
        payload: commentId
    }
}

export function deleteChildComments(parentId){
    return {
        type: DELETE_CHILD_COMMENTS,
        payload: parentId
    }
}
