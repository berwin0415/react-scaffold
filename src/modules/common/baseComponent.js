import React, { Component } from "react";

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this._isAlive = false;
  }
  componentDidMount(){
    this._isAlive = true;   
  }
  componentWillUnmount(){
    this._isAlive = false;
  }
  render() {
    return <div>BaseComponent</div>;
  }
}
