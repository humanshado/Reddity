import _ from 'lodash';
import produce from 'immer';
import { FETCH_POSTS, ADD_POST, EDIT_POST, UPVOTE_POST, DOWNVOTE_POST, DELETE_POST } from '../actions/constants';

let initialState = [
    {
        id: 'gsdhfgw3442',
        title: 'First Post',
        author: 'Abu Jega',
        category: 'lifestyle',
        body: 'I love my job and my awesome life',
        timestamp: 1553093082492,
        voteScore: 5,
        deleted: false,
        commentCount: 2
    },
    {
        id: 'bjshds1937',
        title: 'Second Post',
        author: 'John Doe',
        category: 'education',
        body: 'The greatest thing in life is being aware of what works.',
        timestamp: 553093227953,
        voteScore: 3,
        deleted: false,
        commentCount: 0
    }
]


export default function (state = initialState, action) {
    console.log('action in posts reducer', action);
    console.log('state in posts reducer', state)
    switch (action.type) {
        case FETCH_POSTS:
            return {...state};
        case ADD_POST:
            return {
                ...state,
                [action.payload.id] : action.payload
            }
        case EDIT_POST:
            const otherPosts = Object.values(state).filter(p => p.id !== action.payload.id)
                .reduce((acc, curr) => {
                    acc[curr.id] = curr
                    return acc
                }, {})
            return {
                ...otherPosts,
                [action.payload.id] :action.payload
            }
        case UPVOTE_POST:
            return produce(_.mapKeys(state, 'id'), draft => {
                draft[action.payload].voteScore += 1;
            });
        case DOWNVOTE_POST:
            return produce(_.mapKeys(state, 'id'), draft => {
                draft[action.payload].voteScore -= 1
            });
        case DELETE_POST:
            const allPosts = Object.values(state);
            let newState = allPosts.filter(p => p.id !== action.payload)
            return newState.reduce((acc, cur) => {
                acc[cur.id] = cur;
                return acc;
            },{});
        default:
            return state;
    }
}