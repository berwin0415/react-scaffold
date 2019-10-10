import React, { FC } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createHashHistory } from "history";

import thunk from "redux-thunk";
import rootReducer from "../rootReducer";

import routes from "../routes";
import { createStore, applyMiddleware } from "redux";

import Layout from "../layout";

const store = createStore(rootReducer, applyMiddleware(thunk));
const history = createHashHistory();

const App: FC = () => {

  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout routes={routes}> </Layout>
      </Router>
    </Provider>

  );
};

export default App;
