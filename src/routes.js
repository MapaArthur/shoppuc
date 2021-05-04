import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import { NoLayout } from "./layouts";

// Route Views
import Errors from "./views/Errors";
import ShopPuc from "./views/ShopPuc";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/index" />
  },
  {
    path: "/errors",
    exact: true,
    layout: NoLayout,
    component: Errors
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path:"/",
    layout: DefaultLayout,
    component: ShopPuc
  }
];
