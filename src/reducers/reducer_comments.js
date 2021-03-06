import _ from 'lodash';
import produce from 'immer';
import { FETCH_COMMENTS, ADD_COMMENT, EDIT_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT, DELETE_COMMENT, DELETE_CHILD_COMMENTS } from '../actions/constants';

let initialState = [
    {
        id: 'gsd898',
        author: 'Jibril Tanko',
        body: 'Nice post',
        parentId: 'gsdhfgw3442',
        timestamp: 1553093082532,
        voteScore: 0,
        deleted: false,
        parentDeleted: false
    },
    {
        id: 'kjsd378',
        author: 'Saminu Shehu',
        body: 'I do not share your views on this',
        parentId: 'gsdhfgw3442',
        timestamp: 1553093082893,
        voteScore: 0,
        deleted: false,
        parentDeleted: false
    }
];

export default function (state = initialState, action) {
    console.log('data received in comments reducer ', action.payload)
    switch (action.type) {
        case FETCH_COMMENTS:
            return {...state};
        case ADD_COMMENT:
            return {
                ...state,
                [action.payload.id] : action.payload
            }
        case EDIT_COMMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPVOTE_COMMENT:
            return produce(_.mapKeys(state, 'id'), draft => {
                draft[action.payload].voteScore += 1;
            });
        case DOWNVOTE_COMMENT:
            return produce(_.mapKeys(state, 'id'), draft => {
                draft[action.payload].voteScore -= 1
            });
        case DELETE_COMMENT:
            const allComments = Object.values(state);
            const newState = allComments.filter(c => c.id !== action.payload)
            return newState.reduce((acc, cur) => {
                acc[cur.id] = cur;
                return acc;
            }, {});
        case DELETE_CHILD_COMMENTS:
            let childComments = Object.values(state);
            const c_State = childComments.filter(c => c.parentId !== action.payload)
            return c_State.reduce((acc, cur) => {
                acc[cur.id] = cur;
                return acc;
            }, {});
        default:
            return state;
    }
}
