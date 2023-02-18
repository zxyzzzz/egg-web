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
        let {user_no,goods_name,goods_price,goods_type,goods_detail,goods_img_url} = ctx.request.body;
        let data = 'INSERT INTO goods (`user_no`,`goods_name`,`goods_price`,`goods_type`,`goods_detail`,`goods_img_url`) VALUES(?,?,?,?,?,?)  '
        let res = await app.mysql.query(data, [user_no,goods_name,goods_price,goods_type,goods_detail,goods_img_url]);
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
        let sql = 'SELECT * FROM goods WHERE `id`=? ';
        let res = await app.mysql.query(sql, [id]);
        if(res.length==0){
            ctx.body = Result.fail("error")
        }else{
            let data='UPDATE goods SET `goods_name`=?,`goods_price`=?,`goods_type`=?,`goods_detail`=?,`goods_img_url`=? WHERE `id`=? ';
            let result = await app.mysql.query(data,[goods_name,goods_price,goods_type,goods_detail,goods_img_url,id]);
            ctx.body =  Result.success("编辑成功",result);   
        }
      }

      async search(){
        const { ctx, app } = this;
        let {goods_name,goods_type} = ctx.request.body;
        let sqlName = 'SELECT * FROM goods WHERE `goods_name` like ?';
        let sqlType = 'SELECT * FROM goods WHERE `goods_type` = ?';
        let sqlAll = 'SELECT * FROM goods';
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
        ctx.body =  Result.success("成功",res); 
      }
   
}

module.exports = GoodsController;
