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
          let data = 'UPDATE goods SET `goods_status`=1 WHERE `id`= ?  ';
          let result = await app.mysql.query(data,[goods_id]);
          res = await app.mysql.query(sql1, [user_no,goods_id,order_status,receiving_method,addr_detail]);
        }else{
          let data = 'UPDATE goods SET `goods_status`=1 WHERE `id`= ?  ';
          let result = await app.mysql.query(data,[goods_id]);
          res = await app.mysql.query(sql2, [user_no,goods_id,order_status,receiving_method,addr_id]);
        }
        ctx.body = Result.success("成功", res);
    }
 
    async query(){
      const { ctx, app } = this;
      let { user_no } = ctx.request.body;
      let data="SELECT A.*,B.goods_name,B.goods_price, B.goods_type,B.goods_detail,B.goods_img_url FROM order_info A LEFT JOIN goods B ON A.goods_id = B.id WHERE A.user_no = ?  ";
      let res = await app.mysql.query(data, [user_no]);
      ctx.body = Result.success("查询成功", res);
  }
  
  async edit(){
    const { ctx, app } = this;
    let {id} = ctx.request.body;
    // let sql = 'SELECT * FROM goods WHERE `id`=? ';
    // let res = await app.mysql.query(sql, [id]);
  
    let data = 'UPDATE order_info SET `order_status`=2 WHERE `id`=? ';
    
    let result = await app.mysql.query(data,[id]);
    ctx.body =  Result.success("编辑成功",result);   

  }
  async query_notpay(){
    const { ctx, app } = this;
    let { user_no } = ctx.request.body;
    let data="SELECT A.*,B.goods_name,B.goods_price, B.goods_type,B.goods_detail,B.goods_img_url FROM order_info A LEFT JOIN goods B ON A.goods_id = B.id WHERE A.user_no = ? and A.order_status='0' ";
    let res = await app.mysql.query(data, [user_no]);
    ctx.body = Result.success("查询成功", res);
  }

    async query_notreceive(){
      const { ctx, app } = this;
      let { user_no } = ctx.request.body;
      let data="SELECT A.*,B.goods_name,B.goods_price, B.goods_type,B.goods_detail,B.goods_img_url FROM order_info A LEFT JOIN goods B ON A.goods_id = B.id WHERE A.user_no = ? and A.order_status='1' ";
      let res = await app.mysql.query(data, [user_no]);
      ctx.body = Result.success("查询成功", res);
    }

    async query_received(){
      const { ctx, app } = this;
      let { user_no } = ctx.request.body;
      let data="SELECT A.*,B.goods_name,B.goods_price, B.goods_type,B.goods_detail,B.goods_img_url FROM order_info A LEFT JOIN goods B ON A.goods_id = B.id WHERE A.user_no = ? and A.order_status='2' ";
      let res = await app.mysql.query(data, [user_no]);
      ctx.body = Result.success("查询成功", res);
    }

    async queryall(){
      const { ctx, app } = this;
      let data='SELECT A.*,B.goods_name,B.goods_price, B.goods_type,B.goods_detail,B.goods_img_url FROM order_info A LEFT JOIN goods B ON A.goods_id = B.id';
      let res = await app.mysql.query(data);
      ctx.body = Result.success("查询成功", res);
    }

    async search(){
      const { ctx, app } = this;
      let {goods_name} = ctx.request.body;
      let sqlName = 'SELECT A.*,B.goods_name,B.goods_price, B.goods_type,B.goods_detail,B.goods_img_url FROM order_info A LEFT JOIN goods B ON A.goods_id = B.id  WHERE B.goods_name like ? ';
      // let sqlType = 'SELECT * FROM goods WHERE `goods_type` = ?';
      // let sqlAll = 'SELECT * FROM goods';
      let res = null;
      if(goods_name){
          res = await app.mysql.query(sqlName, [`%${goods_name}%`]);
      }
      // if(goods_type){
      //     if(goods_type=="0"){
      //         res = await app.mysql.query(sqlAll, []);
      //     }else{
      //         res = await app.mysql.query(sqlType, [goods_type]);
      //     }
      // }
      ctx.body =  Result.success("成功",res); 
  }

  
  async delete() {
    const { ctx, app } = this;
    console.log(ctx.request.body);
    let { id } = ctx.request.body;
    let sql = 'SELECT * FROM order_info WHERE `id`=? ';
    let res = await app.mysql.query(sql, [id]);
    if(res.length==0){
        ctx.body = Result.fail("error")
    }else{
        let data='DELETE FROM order_info WHERE `id`=?';
        let result = await app.mysql.query(data,[id]);
        ctx.body =  Result.success("删除成功",result);
    }
   
  }
      
   
}

module.exports = OrderController;
