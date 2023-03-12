'use strict';

let Result = require("../util/Result")

const { Controller } = require('egg');

class LoginController extends Controller {
  async index() {
    //登录
    const {ctx,app} = this;
    let {user_no,password} = ctx.request.body;
    // console.log(ctx.request.body)
    // let data = await loginService.login(app,ctx.request.body);
    let sql = 'SELECT * FROM user_tb WHERE `user_no`=? AND `password`=?';
    let data = await app.mysql.query(sql, [user_no,password]);
    if(data.length==0){
      ctx.body = Result.fail("学号或密码错误",data)
    }else{
      ctx.session.user_no = user_no;
      ctx.body = Result.success("登录成功",[])
    }
  }
  async logout(){
    const {ctx,app} = this;
    let {user_no,password} = ctx.request.body;
    ctx.session.user_no = null;
    ctx.body = Result.success("退出",[])
  }
 
}

module.exports = LoginController;
