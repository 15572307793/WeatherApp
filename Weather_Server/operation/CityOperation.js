/*
 * @Autor: Jiang
 * @Date: 2021-06-28 20:25:11
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 22:32:48
 * @FilePath: /Weather_Server/operation/CityOperation.js
 */
const CityModel = require("../model/CityModel");
const WeatherModel = require("../model/WeatherModel");
class CityOperation {
  static async findAllCity(obj) {
    const res = await CityModel.findAll({
      where: {
        delflag: false,
      },
      attributes: { exclude: ["delflag", "WeatherModelId"] },
    }).catch((e) => console.log(`错误======>>>`, e));
    if (res) {
      return res;
    } else return false;
  }
  static async findWeatherById(obj) {
    const res = await CityModel.findAll({
      where: {
        id: obj,
      },
      include: WeatherModel,
      attributes: { exclude: ["weatherModelId", "delflag", "WeatherModelId"] },
    }).catch((e) => console.log(`错误======>>>`, e));
    if (res) {
      return res;
    } else return false;
  }
}
module.exports = CityOperation;
