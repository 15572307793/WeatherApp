/*
 * @Autor: Jiang
 * @Date: 2021-06-28 18:23:12
 * @LastAutor: you name
 * @LastEditTime: 2021-08-24 10:11:24
 * @FilePath: /Weather_Server/server/server.js
 */
const querystring = require("querystring");
const routes = require("../routes/routes");
const koa = require("koa");
const path = require("path");
const fs = require("fs");
const koaBody = require("koa-body");
const KoaStaticCache = require("koa-static-cache");
// var bodyParser = require("koa-bodyparser"); ////用于koa接收POST请求body数据
const { LEVEL_PATH } = require("../utils/fileAddress");
const POST = 8080;
const app = new koa();
// app.use(bodyParser());
// app.use(routes.routes());

app.use(
  koaBody({
    patchKoa: true,
    multipart: true, // 支持文件上传
    // encoding: "gzip", ///表单的默认编码方式
    formidable: {
      // 设置文件上传目录
      // uploadDir: path.join(__dirname, "../upload/"), ////相对路径
      uploadDir: path.join(
        LEVEL_PATH ////绝对地址保存文件
      ), ////相对路径
      keepExtensions: true, // 保持文件的后缀
      // maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      },
    },
  })
);
// 静态资源处理
app.use(
  KoaStaticCache(LEVEL_PATH, {
    ////前端通过后台ip访问本地文件的权限管理
    prefix: LEVEL_PATH,
    dynamic: true,
    gzip: true,
  })
);
//后端跨域配置
app
  .use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*"); ///允许虽有跨域请求
    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
    );
    ctx.set("Content-Type", "application/json");
    ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    if (ctx.method == "OPTIONS") {
      ctx.body = 200;
    } else {
      await next();
    }
  })
  .use(routes.routes())
  .use(routes.allowedMethods());
/*启动路由*/
// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
// 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
// app.use(routes.routes()).use(routes.allowedMethods());

app.listen(POST);
console.log(`服务端已启动===>>端口:`, POST);
