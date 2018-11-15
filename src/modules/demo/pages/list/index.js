import React from "react";
import { connect } from "react-redux";
class List extends React.Component {
  render() {
    return <div>List component</div>;
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
