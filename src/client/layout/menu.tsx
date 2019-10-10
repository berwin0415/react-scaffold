import React from "react";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router";
const { SubMenu } = Menu;

export default withRouter(menu)
function menu(props:any) {
    const {history} = props
  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" onClick={(e) => history.push('/' + e.keyPath.reverse().join("/"))}>
      <Menu.Item key="1">
        <Icon type="pie-chart" />
        <span>Option 1</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="desktop" />
        <span>Option 2</span>
      </Menu.Item>
      <SubMenu
        key="demo"
        title={
          <span>
            <Icon type="user" />
            <span>Demo</span>
          </span>
        }
      >
        <Menu.Item key="page1">page1</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="team" />
            <span>Team</span>
          </span>
        }
      >
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9">
        <Icon type="file" />
        <span>File</span>
      </Menu.Item>
    </Menu>
  );
}
