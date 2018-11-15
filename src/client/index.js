import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import { Router } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createBrowserHistory from "history/createBrowserHistory";

import rootReducer from './store'

import App from './App'
import routes from './routes'
const history = createBrowserHistory();

const store = createStore(rootReducer,applyMiddleware(thunk))

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <App routes={routes} />
        </Router>
    </Provider>
), document.getElementById('root'));