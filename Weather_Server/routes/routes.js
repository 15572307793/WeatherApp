/*
 * @Autor: Jiang
 * @Date: 2021-06-28 18:58:34
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 22:09:25
 * @FilePath: /Weather_Server/routes/routes.js
 */
const router = require("koa-router")();
const CityController = require("../controllers/CityController");
const path = require("path");

// const KoaBody = require("koa-body");
// // 上传配置
// const uploadOptions = {
//   // 支持文件格式
//   multipart: true,
//   formidable: {
//     // 上传目录 这边直接上传到public文件夹，方便访问 文件夹后面要记得加/
//     uploadDir: path.join(__dirname, "../upload/"),
//     // 保留文件扩展名
//     keepExtensions: true,
//   },
// };
const nginxApi = "/web/rest";
// 给指定地址使用中间件
router.post(`${nginxApi}/user/getFindAllCity`, CityController.getFindAllCity);
router.post(`${nginxApi}/user/getWeatherById`, CityController.getWeatherById);
router.get("/404", async (ctx, next) => {
  ctx.body = "Page Not Found....";
  ctx.status = 404;
  await next();
});

module.exports = router;
