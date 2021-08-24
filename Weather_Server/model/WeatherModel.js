/*
 * @Autor: Jiang
 * @Date: 2021-06-28 20:06:50
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 20:34:31
 * @FilePath: /Weather_Server/model/WeatherModel.js
 */
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
// const Tel = require("./CladdModel");
class WeatherModel extends Model {}

WeatherModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    delflag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    weather: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    currentTemperature: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    maximumTemperature: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    minimumTemperature: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    weatherIcon: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    // classId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   unique: true,
    // },
  },
  {
    // 不要添加时间戳属性 (updatedAt, createdAt)
    timestamps: false,
    // 不实际删除数据 而是设置一个新 deletedAt 属性，其值为当前日期 timestamps 启用时
    //paranoid: true,
    // 不需要 `createdAt`
    createdAt: false,
    // 需要 `updatedAt`，但列名为"updateTime"
    updatedAt: "updateTime",
    // 自动设置字段为蛇型命名规则
    underscored: true,
    // 定义表名
    tableName: "weatherModel",
    sequelize,
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true,
  }
);
module.exports = WeatherModel;
