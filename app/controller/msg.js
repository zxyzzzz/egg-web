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
    let { user_no, msg_detail, msg_time } = ctx.request.body;
    let data = 'INSERT INTO user_msg (`user_no`,`msg_detail`,`msg_time`) VALUES(?,?,?)  '
    let res = await app.mysql.query(data, [user_no, msg_detail, msg_time,]);
    ctx.body = Result.success("成功", res);
  }

  async query() {
    const { ctx, app } = this;
    let data = 'SELECT A.*,B.user_name FROM user_msg A LEFT JOIN user_tb B ON A.user_no=B.user_no ';
    let res = await app.mysql.query(data);
    ctx.body = Result.success("查询成功", res);
  }
  
  async delete() {
    const { ctx, app } = this;
    console.log(ctx.request.body);
    let { id } = ctx.request.body;
    let sql = 'SELECT * FROM user_msg WHERE `id`=? ';
    let res = await app.mysql.query(sql, [id]);
    if (res.length == 0) {
      ctx.body = Result.fail("error")
    } else {
      let data = 'DELETE FROM user_msg WHERE `id`=?';
      let result = await app.mysql.query(data, [id]);
      ctx.body = Result.success("删除成功", result);
    }
  }
}
module.exports = MsgController;