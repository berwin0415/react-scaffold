import React from "react";
import { Switch, Route } from "react-router";
import { Layout } from "antd";
import Menu from './menu'

const { Header, Sider, Content } = Layout;

export default function index(props: any) {
  const { routes } = props;

  return (
    <Layout style={{minHeight:"100vh"}}>
      <Header style = {{background:"#ffffff"}}>header</Header>
      <Layout>
        <Sider collapsible><Menu></Menu></Sider>
        <Content>
          <Switch>
            {routes.map((item: any) => (
              <Route key={item.path} {...item}></Route>
            ))}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
