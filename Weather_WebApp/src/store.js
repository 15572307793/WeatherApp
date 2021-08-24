/*
 * @Autor: Jiang
 * @Date: 2021-08-22 16:10:58
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 23:07:57
 * @FilePath: /Weather_WebApp/src/store.js
 */
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import weatherDataReducer from "./pages/weatherPage/store/reducer";

const middlewares = [thunkMiddleware];

const storeEnhancers = compose(applyMiddleware(...middlewares));

const reducers = combineReducers({
  weatherData: weatherDataReducer,
});

const initState = {
  weatherData: {
    cityData: [],
    weatherByIdData: {},
  },
};
export default createStore(reducers, initState, storeEnhancers);
