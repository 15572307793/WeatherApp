/*
 * @Autor: Jiang
 * @Date: 2021-06-28 19:03:51
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 23:11:14
 * @FilePath: /Weather_Server/controllers/cityController.js
 */
const CityOperation = require("../operation/CityOperation");
///获取所有城市
const getFindAllCity = async (ctx, next) => {
  let responseData = {
    cmd: "findAllclass",
    type: "response",
    response: {},
  };
  const getData = await CityOperation.findAllCity();

  if (getData) {
    responseData.response.res = true;
    let newArray = [...getData];
    responseData.response.message = newArray;
  } else {
    responseData.response.res = false;
    responseData.response.exception = "查找错误";
  }
  ctx.status = 200;
  ctx.body = responseData;
};
///根据id获取城市天气数据
const getWeatherById = async (ctx, next) => {
  let responseData = {
    cmd: "getWeatherById",
    type: "response",
    response: {},
  };
  const data = ctx.request.body.request;
  const id = data.id;
  if (id) {
    const getData = await CityOperation.findWeatherById(id);
    if (getData) {
      responseData.response.res = true;
      let newArray = getData;
      responseData.response.message = newArray;
    } else {
      responseData.response.res = false;
      responseData.response.exception = "查找错误";
    }
  } else {
    responseData.response.res = false;
    responseData.response.exception = "请填写id";
  }
  ctx.status = 200;
  ctx.body = responseData;
};
module.exports = {
  getFindAllCity,
  getWeatherById,
};
