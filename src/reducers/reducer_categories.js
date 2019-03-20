import { FETCH_CATEGORIES, SET_CATEGORY_FILTER } from '../actions/constants';

let initialState = ['Politics', 'Education', 'Sports', 'Lifestyle', 'Health'];

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