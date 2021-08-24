/*
 * @Autor: Jiang
 * @Date: 2021-08-22 15:43:34
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 22:38:54
 * @FilePath: /Weather_WebApp/src/index.js
 */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Start from "./pages/startPage";
import RouterConfig from "./router/routerConfig";
import store from "./store";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <RouterConfig />
  </Provider>,
  document.getElementById("root")
);
