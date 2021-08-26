const { Sequelize, DataTypes, Model, BOOLEAN } = require("sequelize");
const sequelize = require("../utils/sequelize");
const WeatherModel = require("./WeatherModel");
const { LEVEL_PATH } = require("../utils/fileAddress");

// const sequelize = new Sequelize("sqlite::memory:");
class CityModel extends Model {}

CityModel.init(
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
    cityName: {
      type: DataTypes.STRING,
      allowNull: false, ////不可为空
      unique: true, ///不可相同
    },
    // weatherModelId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   unique: true,
    // },
  },
  {
    // 定义表名
    tableName: "cityModel",
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
    sequelize,
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true,
  }
);
///一对一:
WeatherModel.hasOne(CityModel, {
  foreignKey: "weatherModelId",
});
CityModel.belongsTo(WeatherModel); // 这将在 CityModel 中创建 `captainId` 外键.

/////一对多:
// ClassModel.hasMany(User, {
//   foreignKey: "classId",
//   targetKey: "id",
// }); //
// User.belongsTo(ClassModel);

// CityModel.hasMany(User, {
//   foreignKey: "classId", ///我们可对表中字段，进行自定义外键
// });
// User.belongsTo(Class);
let weathData = [
  {
    cityName: "Sydney",
    currentData: {
      weatherIcon: `${LEVEL_PATH}/rain.png`,
      weather: "Light Rain",
      currentTemperature: "19°",
      maximumTemperature: "22°",
      minimumTemperature: "16°",
    },
  },
  {
    cityName: "Brisbane",
    currentData: {
      weatherIcon: `${LEVEL_PATH}/thunderStorm.png`,
      weather: "Thundershowers",
      currentTemperature: "25°",
      maximumTemperature: "29°",
      minimumTemperature: "18°",
    },
  },
  {
    cityName: "Melbourne",
    currentData: {
      weatherIcon: `${LEVEL_PATH}/sunny.png`,
      weather: "sunny",
      currentTemperature: "14°",
      maximumTemperature: "19°",
      minimumTemperature: "7°",
    },
  },
];
WeatherModel.sync()
  .then(() => {
    console.log("WeatherModel表建立完成==>>>");
    weathData.forEach((element) => {
      WeatherModel.create(element.currentData);
    });
    console.log("WeatherModel表初始数据插入完成==>>>");
  })
  .then(() => {
    // console.log(`object`, object)
    CityModel.sync()
      .then(() => {
        console.log("CityModel表建立完成==>>>");
        weathData.forEach((element, index) => {
          element.weatherModelId = index + 1;
          CityModel.create(element);
        });
        console.log("CityModel表初始数据插入完成==>>>");
      })
      .catch((e) => console.log(`CityModel表建立失败==>>>`, e));
  })
  .catch((e) => console.log(`WeatherModel表建立失败==>>>`, e)); ////可以用sequelize.sync()   //给的值若是{ force: true }会直接重建新表

module.exports = CityModel;
