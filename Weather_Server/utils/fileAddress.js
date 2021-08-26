/*
 * @Autor: Jiang
 * @Date: 2021-08-24 10:14:33
 * @LastAutor: you name
 * @LastEditTime: 2021-08-26 11:20:49
 * @FilePath: /Weather_Server/utils/fileAddress.js
 */
const path = require("path");

const LEVEL_PATH = path.resolve(__dirname, "../upload");

// path.resolve(__dirname, "..");
// const LEVEL_PATH = `${__dirname}/../upload`;

module.exports = {
  LEVEL_PATH,
};
