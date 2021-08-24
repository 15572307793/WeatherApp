/*
 * @Autor: Jiang
 * @Date: 2021-08-22 16:00:58
 * @LastAutor: you name
 * @LastEditTime: 2021-08-24 10:26:05
 * @FilePath: /Weather_WebApp/craco.config.js
 */
//当前项目的绝对路劲
const path = require("path");
const CracoLessPlugin = require("craco-less");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  webpack: {
    //路径映射 如 @src 代表 /src文件夹
    alias: {
      "@src": path.resolve("src"),
      "@pages": path.resolve("src/pages"),
      "@component": path.resolve("src/component"),
      "@utils": path.resolve("src/utils"),
      "@assets": path.resolve("src/assets"),
      "@layout": path.resolve("src/layout"),
      "@router": path.resolve("src/router"),
    },
    plugins: [
      //显示启动和打包进度条
      new ProgressBarPlugin({
        format: `٩(๑❛ᴗ❛๑)۶ build  [:bar]  ${chalk.green.bold(
          "(:percent)"
        )}  ${chalk.red.bold("(:elapsed 秒)")}`,
        complete: chalk.green.bold("-"),
        clear: false,
      }),
      // new Webpack.HotModuleReplacementPlugin(),    // 使用webpack内置的模块热替换插件
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
        //加入css modules后 css名字将会转变成hash唯一值
        cssLoaderOptions: {
          modules: { localIdentName: "[local][name]_[hash:base64:5]" },
        },
      },
    },
  ],
  devServer: {
    host: "0.0.0.0", //启动主机号，默认是localhost,设置 0.0.0.0 服务器外部可访问
    port: 8070, //启动端口，默认是3000
    historyApiFallback: true, //解决开启页面后白屏问题
    // proxy: {
    //   ...proxy, //在proxy.js文件修改实际代理
    // },
  },
};
