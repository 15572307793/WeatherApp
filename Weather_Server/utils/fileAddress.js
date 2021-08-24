/*
 * @Autor: Jiang
 * @Date: 2021-07-05 20:26:27
 * @LastAutor: you name
 * @LastEditTime: 2021-08-24 10:14:30
 * @FilePath: /Weather_Server/utils/fileAddress.js
 */
const path = require("path");

const LEVEL_PATH = path.resolve(__dirname, "../upload");

// path.resolve(__dirname, "..");
// const LEVEL_PATH = `${__dirname}/../upload`;

module.exports = {
  LEVEL_PATH,
};
