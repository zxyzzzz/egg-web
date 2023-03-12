#!/bin/bash
cd /root/egg-web
# npm install
cp -r /root/sofltware/vue-app-public/dist/* /root/egg-web/app/public
cp -r /root/sofltware/node_modules /root/egg-web/
npm run stop
npm run start