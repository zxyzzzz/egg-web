#!/bin/bash
# 切换工作目录
cd /root/egg-web
# npm install
# 删除文件夹
rm -rf /root/egg-web/app/public
rm -rf /root/egg-web/node_modules
# 拷贝文件夹
cp -r /root/sofltware/node_modules /root/egg-web/
cp -r /root/sofltware/vue-app-public/public/ /root/egg-web/app/public/
# 停止node服务
npm run stop
# 启动node服务
npm run start