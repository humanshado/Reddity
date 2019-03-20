import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories';
import PostsReducer from './reducer_posts';
import PostReducer from './reducer_post';
import CommentsReducer from './reducer_comments';
import { reducer as formReducer }  from 'redux-form';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    posts: PostsReducer,
    post: PostReducer,
    comments: CommentsReducer,
    form: formReducer
});

export default rootReducer;