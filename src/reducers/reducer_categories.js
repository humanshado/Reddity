import { FETCH_CATEGORIES, SET_CATEGORY_FILTER } from '../actions/constants';

let initialState = [
    { name: 'all', path: 'all', isActive: true },
    { name: 'politics', path: 'politics', isActive: false },
    { name: 'education', path: 'education', isActive: false },
    { name: 'sports', path: 'sports', isActive: false },
    { name: 'lifestyle', path: 'lifestyle', isActive: false },
    { name: 'health', path: 'health', isActive: false }
];

export default function (state = initialState, action){
    switch(action.type){
        case FETCH_CATEGORIES:
            return [...state]
        case SET_CATEGORY_FILTER:
            return { ...action.payload }
        default:
            return state;
    }
}