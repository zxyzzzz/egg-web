'use strict';

let fs = require("fs");
let path = require("path");
let loginService = require("../services/loginService")
let Result = require("../util/Result")

const { Controller } = require('egg');

class AplController extends Controller {
  async add() {
    const { ctx, app } = this;
    console.log(ctx.request.body)
    let { user_no,order_id, apl_status, img_url, id } = ctx.request.body;
    //添加申请
    let data = 'INSERT INTO pay_apl (`user_no`,`order_id`,`apl_status`,`img_url`) VALUES(?,?,?,?)  '
    let res = await app.mysql.query(data, [user_no,order_id, apl_status, img_url,id]);
    //修改订单状态
    let data1 = 'UPDATE order_info SET `order_status`=1 WHERE `id`=? ';
    let result1 = await app.mysql.query(data1,[id]);
    ctx.body = Result.success("成功", []);
  }

//   async query() {
//     const { ctx, app } = this;
//     let data = 'SELECT A.*,B.user_name,B.tel FROM user_apl A LEFT JOIN user_tb B ON A.user_no=B.user_no WHERE `apl_status`=0 ';
//     let res = await app.mysql.query(data);
//     ctx.body = Result.success("查询成功", res);
//   }

//   async pass() {
//     const { ctx, app } = this;
//     let {id,user_no} = ctx.request.body;
//     //修改申请状态
//     let data = 'UPDATE user_apl SET `apl_status`=1 WHERE `id`=? ';
//     let result = await app.mysql.query(data,[id]);
//     //重置密码
//     let data1 = 'UPDATE user_tb SET `password`=1234567 WHERE `user_no`=? ';
//     let result1 = await app.mysql.query(data1,[user_no]);
//     ctx.body =  Result.success("编辑成功",[]);  
//   }


}
module.exports = AplController;