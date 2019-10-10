import React, { useState, Component } from "react";
import styles from "./index.module.scss";
import { Table, Button, Form, Input } from "antd";
import { TableRowSelection } from "antd/lib/table";
import EditCell from "./EditCell";

import Ajax from '../../../client/request'
interface IRecord {
  key: number;
  name: string;
  age: number;
  address: string;
}

class Index extends Component<any, any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      height: 0
    };
  }
  componentDidMount() {
    Ajax.post('/webhook',{},{
      headers:{
        'x-github-event':'push',
        'x-github-delivery':'c97e3092-dd54-11e9-9a5e-353a798d297b'
      }
    })
    console.log("componentdidmount");
    console.time()
    console.timeEnd()
    let timer = setInterval(() => {
      console.log("componentdidmount", "interval");
      this.setState({ height: this.state.height + 1 },() => {
        if (this.state.height > 500) {
          clearInterval(timer)
        }
      });
    }, 2);
    // setTimeout(() => {
    //   this.setState({height:500})
    // }, 0);
  }
  render() {
    const { height } = this.state;
    console.log(height)
    return <div style={{ height, width: 400, background: "blue" }}className={styles.animate}></div>;
  }
}

export default Index;
