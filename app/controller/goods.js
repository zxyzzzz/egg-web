'use strict';

let fs = require("fs");
let path = require("path");
let loginService = require("../services/loginService")
let Result = require("../util/Result")

const { Controller } = require('egg');

class GoodsController extends Controller {
    async add() {
        const { ctx, app } = this;
        console.log(ctx.request.body)
        let {user_no,goods_name,goods_status,goods_price,goods_type,goods_detail,goods_img_url} = ctx.request.body;
        let data = 'INSERT INTO goods (`user_no`,`goods_name`,`goods_status`,`goods_price`,`goods_type`,`goods_detail`,`goods_img_url`) VALUES(?,?,?,?,?,?,?)  '
        let res = await app.mysql.query(data, [user_no,goods_name,goods_status,goods_price,goods_type,goods_detail,goods_img_url]);
        ctx.body = Result.success("成功", res);
    }

    async delete() {
        const { ctx, app } = this;
        console.log(ctx.request.body);
        let { id } = ctx.request.body;
        let sql = 'SELECT * FROM goods WHERE `id`=? ';
        let res = await app.mysql.query(sql, [id]);
        if(res.length==0){
            ctx.body = Result.fail("error")
        }else{
            let data='DELETE FROM goods WHERE `id`=?';
            let result = await app.mysql.query(data,[id]);
            ctx.body =  Result.success("删除成功",result);
        }
       
      }

      async edit(){
        const { ctx, app } = this;
        let {goods_name,goods_price,goods_type,goods_detail,goods_img_url,id} = ctx.request.body;
        // let sql = 'SELECT * FROM goods WHERE `id`=? ';
        // let res = await app.mysql.query(sql, [id]);
      
        let data='UPDATE goods SET `goods_name`=?,`goods_price`=?,`goods_type`=?,`goods_detail`=?,`goods_img_url`=? WHERE `id`=? ';
        let result = await app.mysql.query(data,[goods_name,goods_price,goods_type,goods_detail,goods_img_url,id]);
        ctx.body =  Result.success("编辑成功",result);   
   
      }

      async search(){
        const { ctx, app } = this;
        let {goods_name,goods_type} = ctx.request.body;
        let sqlName = 'SELECT * FROM goods WHERE `goods_name` like ? AND `goods_status`=0';
        let sqlType = 'SELECT * FROM goods WHERE `goods_type` = ? AND `goods_status`="0" ';
        let sqlAll = 'SELECT * FROM goods WHERE `goods_status`="0"';
        let res = null;
        if(goods_name){
            res = await app.mysql.query(sqlName, [`%${goods_name}%`]);
        }
        if(goods_type){
            if(goods_type=="0"){
                res = await app.mysql.query(sqlAll, []);
            }else{
                res = await app.mysql.query(sqlType, [goods_type]);
            }
        }
        ctx.body =  Result.success("成功"+ctx.session.user_no,res); 
  }
  
  async searchall(){
    const { ctx, app } = this;
    let {goods_name} = ctx.request.body;
    let sqlName = 'SELECT * FROM goods WHERE `goods_name` like ?  ';
    let res = null;
    if(goods_name){
        res = await app.mysql.query(sqlName, [`%${goods_name}%`]);
    }
    ctx.body =  Result.success("成功",res); 
  }

      async queryall(){
        const { ctx, app } = this;
        let data='SELECT * FROM goods';
        let res = await app.mysql.query(data);
        ctx.body = Result.success("查询成功", res);
      }

      async queryupload(){
        const { ctx, app } = this;
        let data='SELECT * FROM goods WHERE user_no = ? AND goods_status=0';
        let res = await app.mysql.query(data,[ctx.request.body.user_no,ctx.request.body.goods_status]);
        ctx.body = Result.success("查询成功", res);
      }

    
      async querysold(){
        const { ctx, app } = this;
        let data='SELECT * FROM goods WHERE user_no = ? AND goods_status=1';
        let res = await app.mysql.query(data,[ctx.request.body.user_no,ctx.request.body.goods_status]);
        ctx.body = Result.success("查询成功", res);
      }
   
}

module.exports = GoodsController;
