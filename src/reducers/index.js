import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories';
import PostsReducer from './reducer_posts';
import CommentsReducer from './reducer_comments';
import { reducer as formReducer }  from 'redux-form';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    posts: PostsReducer,
    comments: CommentsReducer,
    form: formReducer
});

export default rootReducer;