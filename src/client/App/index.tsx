import React, { FC } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Home from '$modules/home';
import Demo from '$modules/demo';

const history = createBrowserHistory()

const App: FC = () => {
  return (
    <div className="App">
      App component
      <Router history={history}>
        <Switch>
          <Route path="/demo" component={Demo}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
