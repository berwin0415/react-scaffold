import React from "react";
import { connect } from "react-redux";
class List extends React.Component {
  handleClick(){
    fetch('/api',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  render() {
    return (
      <div>
        <h2>List component</h2>
        <button onClick={() => this.handleClick()}>fetch API</button>
      </div>
    );
  }
}
export default connect(
  state => ({
    state
  }),
  dispatch => ({
    dispatch
  })
)(List);
