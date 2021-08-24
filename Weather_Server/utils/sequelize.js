/*
 * @Autor: Jiang
 * @Date: 2021-06-28 19:57:17
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 17:16:19
 * @FilePath: /Weather_Server/utils/sequelize.js
 */
const Sequelize = require("sequelize");
////创建文件绝对地址

/////数据库配置文件
var config = {
  database: "Weather",
  username: "root",
  password: "123456",
  host: "localhost",
  port: 3306,
};
////建立 sequelize 实例
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
    },
    ///无效配置项
    // dialectOptions: {
    //   // 字符集
    //   charset: "utf8mb4",
    //   collate: "utf8mb4_unicode_ci",
    //   supportBigNumbers: true,
    //   bigNumberStrings: true,
    // },
    // timezone: "+08:00", //时区转换
  }
);
sequelize
  .authenticate()
  .then(() => console.log("数据库链接正常"))
  .catch((err) => console.log("数据库链接失败", err));

module.exports = sequelize;
