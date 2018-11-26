import React from "react";

import Bundle from "Client/bundle";

const Detail = props => (
  <Bundle load={() => import("../pages/detail")}>
    {Detail => <Detail {...props} />}
  </Bundle>
);

const route = {
  title: "详情页",
  path: "/detail",
  exact: true,
  component: Detail
};
export default route;
