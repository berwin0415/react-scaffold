import React from "react";
import { Route, Redirect, Switch } from "react-router";

export default class App extends React.Component {
  render() {
    const routers = this.props.routes.map(item => (
      <Route key={item.path} {...item} />
    )); 
    return (
      <Switch>
        {routers}
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}
