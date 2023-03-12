#!/bin/bash
cd /root/egg-web
# npm install
cp -r /root/sofltware/node_modules /root/egg-web/
npm run stop
npm run start