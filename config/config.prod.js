/* eslint valid-jsdoc: "off" */

'use strict';
const path = require("path");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {

  const config = exports = {};



  // add your user config here
  const userConfig = {
    fileDir:path.resolve(process.cwd(),"files")
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'Zxy123456!',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };



  return {
    ...config,
    ...userConfig,
  };
};
