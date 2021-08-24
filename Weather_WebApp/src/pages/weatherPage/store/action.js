/*
 * @Autor: Jiang
 * @Date: 2021-08-22 16:40:51
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 23:08:22
 * @FilePath: /Weather_WebApp/src/pages/weatherPage/store/action.js
 */
import request, { ServerIP } from "@src/utils/request.js";
import { message } from "antd";
import * as actionType from "./actionType";

//获取全部城市信息
export const getFindAllCityRequest = () => {
  return (dispatch) => {
    request("POST", ServerIP + "/web/rest/user/getFindAllCity", {
      cmd: "getFindAllCity",
      type: "request",
      request: {},
    })
      .then((res) => {
        const result = res.response;
        // console.log("getFindAllCity", result);
        if (result.res) {
          for (let i = 0; i < result.message.length; i++) {
            result.message[i].currentData = {};
          }
          dispatch(getFindAllCityReducer(result.message));
        } else {
          console.error("获取城市数据失败" + res.exception, 1);
        }
      })
      .catch((err) => console.log(err));
  };
};

const getFindAllCityReducer = (data) => ({
  type: actionType.GET_FINDALLCITYREQUEST,
  data,
});

//根据Id获取城市天气
export const getWeatherByIdRequest = (params) => {
  return (dispatch) => {
    request("POST", ServerIP + "/web/rest/user/getWeatherById", {
      cmd: "getWeatherById",
      type: "request",
      request: {
        ...params,
      },
    })
      .then((res) => {
        const result = res.response;
        // console.log("getWeatherById", result);
        if (result.res) {
          dispatch(getWeatherByIdReducer(result.message[0]));
        } else {
          console.error("获取天气数据失败" + res.exception, 1);
        }
      })
      .catch((err) => console.log(err));
  };
};

const getWeatherByIdReducer = (data) => ({
  type: actionType.GET_WEATHERBYIDREQUEST,
  data,
});
