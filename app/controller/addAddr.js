'use strict';

let fs = require("fs");
let path = require("path");
let loginService = require("../services/loginService")
let Result = require("../util/Result")

const { Controller } = require('egg');

class AddAddrController extends Controller {
    async add() {
        //添加地址
        const { ctx, app } = this;
        console.log(ctx.request.body)
        let {consignee,user_no,province,city,area,detail_addr,tel} = ctx.request.body;
        let data = 'INSERT INTO user_addr (`consignee`,`user_no`,`province`,`city`,`area`,`detail_addr`,`tel`) VALUES(?,?,?,?,?,?,?)  '
        let res = await app.mysql.query(data, [consignee,user_no,province,city,area,detail_addr,tel]);
        ctx.body = Result.success("成功", res);
    }

    async delete() {
        const { ctx, app } = this;
        console.log(ctx.request.body);
        let { id } = ctx.request.body;
        let sql = 'SELECT * FROM user_addr WHERE `id`=? ';
        let res = await app.mysql.query(sql, [id]);
        if(res.length==0){
            ctx.body = Result.fail("error")
        }else{
            let data='DELETE FROM user_addr WHERE `id`=?';
            let result = await app.mysql.query(data,[id]);
            ctx.body =  Result.success("删除成功",result);
        }
       
      }

      async edit(){
        const { ctx, app } = this;
        let {id,consignee,province,city,area,detail_addr,tel} = ctx.request.body;
        let sql = 'SELECT * FROM user_addr WHERE `id`=? ';
        let res = await app.mysql.query(sql, [id]);
        if(res.length==0){
            ctx.body = Result.fail("error")
        }else{
            let data='UPDATE user_addr SET `consignee`=?,`province`=?,`city`=?,`area`=?,`detail_addr`=?,`tel`=? WHERE `id`=? ';
            let result = await app.mysql.query(data,[consignee,province,city,area,detail_addr,tel,id]);
            ctx.body =  Result.success("编辑成功",result);   
        }
      }
      async query(){
        const { ctx, app } = this;
        let sql = 'SELECT *FROM user_addr WHERE user_no = ?';
        let result = await app.mysql.query(sql,[ctx.request.body.user_no]);
        ctx.body =  Result.success("查询成功",result);   
      }
   
}

module.exports = AddAddrController;
