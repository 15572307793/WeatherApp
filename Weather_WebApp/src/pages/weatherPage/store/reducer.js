/*
 * @Autor: Jiang
 * @Date: 2021-08-22 16:40:51
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 22:31:04
 * @FilePath: /Weather_WebApp/src/pages/weatherPage/store/reducer.js
 */
import * as actionType from "./actionType";

export default (state = {}, action) => {
  switch (action.type) {
    case actionType.GET_FINDALLCITYREQUEST: {
      return { ...state, cityData: action.data };
    }
    case actionType.GET_WEATHERBYIDREQUEST: {
      return { ...state, weatherByIdData: action.data };
    }

    default:
      return state;
  }
};
