import React, { FC, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'


import routes from '../routes'

const history = createBrowserHistory()

const App: FC = () => {
  useEffect(() => {
    let a = "b"
  }, [1])
  return (
    <div className="App">
      <div>App component</div>
      <Router history={history}>
        <Switch>
          {routes.map(item => <Route key={item.path} {...item}></Route>)}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
