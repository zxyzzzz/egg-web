'use strict';

let Result = require("../util/Result")

const { Controller } = require('egg');

class RegisterController extends Controller {
    async index() {
        //登录
        const { ctx, app } = this;
        console.log(ctx.request.body)
        //   let data = await app.mysql.query("SELECT * FROM user_tb", []);
        //   ctx.body = Result.success("成功",data);
        let {user_name,user_no,password,tel} = ctx.request.body;
        let insertImp = 'INSERT INTO user_tb (`user_name`,`user_no`,`password`,`tel`,`user_type`) VALUES(?,?,?,?,?)'
        let res = await app.mysql.query(insertImp, [user_name,user_no,password,tel,'1']);
        ctx.body = Result.success("成功", res);
    }
}

module.exports = RegisterController;
