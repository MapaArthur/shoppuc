import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import ShopPuc from "./views/ShopPuc";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/index" />
  },
  {
    path:"/",
    layout: DefaultLayout,
    component: ShopPuc
  }
];
