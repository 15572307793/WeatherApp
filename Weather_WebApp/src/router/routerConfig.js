/*
 * @Autor: Jiang
 * @Date: 2021-08-22 16:14:42
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 16:32:40
 * @FilePath: /Weather_WebApp/src/router/routerConfig.js
 */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import getRouter from "./router";
const renderRouter = (routers) => {
  //   if (!Array.isArray(routers)) return null;
  return (
    <Switch>
      {routers.map((route, index) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          );
        }
        return (
          <Route
            key={route.key || index}
            exact={route.exact}
            strict={route.exact}
            path={route.path}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
};

const RouterConfig = () => {
  return <Router>{renderRouter(getRouter())}</Router>;
};

export default RouterConfig;
