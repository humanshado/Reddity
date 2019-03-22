import { FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE, EDIT_DETAIL_POST, UPVOTE_POST, DOWNVOTE_POST, DELETE_POST } from '../actions/constants';

const initialState = {
    post: {},
    isFetching: false,
    error: ""
}

export default function (state = initialState, action) {
    //console.log('action in post reducer ', action)
    switch (action.type) {
        case FETCH_POST_REQUEST:
            return {...state};
        case EDIT_DETAIL_POST:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case DELETE_POST:
            const allPosts = Object.values(state);
            const newState = allPosts.filter(p => p.id !== action.payload.id)
            return newState.reduce((acc, cur) => {
                acc[cur.id] = cur;
                return acc;
            }, {});
        default:
            return state;
    }
}