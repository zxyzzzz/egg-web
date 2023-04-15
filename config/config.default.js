/* eslint valid-jsdoc: "off" */

'use strict';
const path = require("path");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1671457287982_6686';

  // add your middleware config here
  config.middleware = [
    "slow",
    "notfoundHandler"
  ];
  config.slow = {
    enable: true,
    threshold:0,
    match: '*'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    fileDir:path.resolve(process.cwd(),"files")
  };

  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: '/', 
    dir: [
      path.join(appInfo.baseDir, 'app/public'),
      // path.join(appInfo.baseDir, 'app/static'),
    ], // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.onerror = {
    accepts: (ctx) => {
      return 'json';
    },
    json(err, ctx) { // json hander
      console.log(err)
      ctx.body = {
        message: err.message,
        // stack:err.stack,
        errorcode:1,
        status:err.status,
      }
      ctx.status = err.status
    }
  }


  config.cors = {
    origin: '*', // 或者 origin: '*'  *代表所有来源都可访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', //允许的请求方式  get、post等基本请求方式不需要设置
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '101.42.46.158',
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

  
  config.multipart = {
    mode: 'file',
    // fileSize: 1048576000,

    // whitelist: ['.rar']
  }


  return {
    ...config,
    ...userConfig,
  };
};
