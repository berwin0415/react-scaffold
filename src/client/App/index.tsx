import React, { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";

import thunk from "redux-thunk";
import rootReducer from "../rootReducer";

import routes from "../routes";
import { createStore, applyMiddleware } from "redux";

import Layout from "../layout";

const store = createStore(rootReducer, applyMiddleware(thunk));
const history = createHashHistory();

const App: FC = () => {
  useEffect(() => {
    let a = "b";
  }, [1]);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout routes={routes}> </Layout>
      </Router>
    </Provider>
    // <div className="App">
    //   <div>App component</div>
    //   <Router history={history}>
    //     <Switch>
    //       {routes.map(item => <Route key={item.path} {...item}></Route>)}
    //     </Switch>
    //   </Router>
    // </div>
  );
};

export default App;
