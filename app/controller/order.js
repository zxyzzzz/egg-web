'use strict';

let fs = require("fs");
let path = require("path");
let loginService = require("../services/loginService")
let Result = require("../util/Result")

const { Controller } = require('egg');

class OrderController extends Controller {
    async add() {
        const { ctx, app } = this;
        console.log(ctx.request.body)
        let sql1 = 'INSERT INTO order_info (`user_no`,`goods_id`,`order_status`,`receiving_method`,`addr_detail`) VALUES(?,?,?,?,?)'
        let sql2 = 'INSERT INTO order_info (`user_no`,`goods_id`,`order_status`,`receiving_method`,`addr_id`) VALUES(?,?,?,?,?)'
        let {user_no,goods_id,order_status,receiving_method,addr_id,addr_detail} = ctx.request.body;
        let res;
        if(receiving_method =="1"){
          res = await app.mysql.query(sql1, [user_no,goods_id,order_status,receiving_method,addr_detail]);
        }else{
          res = await app.mysql.query(sql2, [user_no,goods_id,order_status,receiving_method,addr_id]);
        }
        ctx.body = Result.success("成功", res);
    }

 
    async query(){
      const { ctx, app } = this;
      let { user_no } = ctx.request.body;
      let data="SELECT A.*,B.goods_name,B.goods_price, B.goods_type,B.goods_detail,B.goods_img_url FROM order_info A LEFT JOIN goods B ON A.goods_id = B.id WHERE A.user_no = ? and A.order_status='0' ";
      let res = await app.mysql.query(data, [user_no]);
      ctx.body = Result.success("查询成功", res);
    }
      
   
}

module.exports = OrderController;
