#!/bin/bash
cd /root/egg-web
# npm install
rm -rf /root/egg-web/app/public
rm -rf /root/egg-web/node_modules
cp -r /root/sofltware/node_modules /root/egg-web/
cp -r /root/sofltware/vue-app-public/public/ /root/egg-web/app/public/
npm run stop
npm run start