import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import { Router, Route } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createBrowserHistory from "history/createBrowserHistory";

import rootReducer from './store'

import App from './App'
const history = createBrowserHistory();

const store = createStore(rootReducer,applyMiddleware(thunk))

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}></Route>
        </Router>
    </Provider>
), document.getElementById('root'));