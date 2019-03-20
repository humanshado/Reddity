import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { BrowserRouter, Route } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger))
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
          <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);


registerServiceWorker();
