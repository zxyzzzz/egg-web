'use strict';

let fs = require("fs");
let path = require("path");
let loginService = require("../services/loginService")
let Result = require("../util/Result")

const { Controller } = require('egg');

class MsgController extends Controller {
  async add() {
    const { ctx, app } = this;
    console.log(ctx.request.body)
    let { user_no, apl_status, apl_time } = ctx.request.body;
    let data = 'INSERT INTO user_apl (`user_no`,`apl_status`,`apl_time`) VALUES(?,?,?)  '
    let res = await app.mysql.query(data, [user_no, apl_status, apl_time,]);
    ctx.body = Result.success("成功", res);
  }

  async query() {
    const { ctx, app } = this;
    let data = 'SELECT A.*,B.user_name,B.tel FROM user_apl A LEFT JOIN user_tb B ON A.user_no=B.user_no WHERE `apl_status`=0 ';
    let res = await app.mysql.query(data);
    ctx.body = Result.success("查询成功", res);
  }

  async pass() {
    const { ctx, app } = this;
    let {id,user_no} = ctx.request.body;
    //修改申请状态
    let data = 'UPDATE user_apl SET `apl_status`=1 WHERE `id`=? ';
    let result = await app.mysql.query(data,[id]);
    //重置密码
    let data1 = 'UPDATE user_tb SET `password`=1234567 WHERE `user_no`=? ';
    let result1 = await app.mysql.query(data1,[user_no]);
    ctx.body =  Result.success("编辑成功",[]);  
  }

  async reject() {
    const { ctx, app } = this;
    let {id} = ctx.request.body; 
    let data='UPDATE user_apl SET `apl_status`=1 WHERE `id`=? ';
    let result = await app.mysql.query(data,[id]);
    ctx.body =  Result.success("编辑成功",result);  
  }
  
}
module.exports = MsgController;