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
        let {user_no,goods_id} = ctx.request.body;
        let data = 'INSERT INTO shoppingcart (`user_no`,`goods_id`) VALUES(?,?)  '
        let res = await app.mysql.query(data, [user_no,goods_id]);
        ctx.body = Result.success("成功", res);
    }

    async query(){
        const { ctx, app } = this;
        let { user_no } = ctx.request.body;
        let data="SELECT A.*,B.goods_name,B.goods_price,B.goods_img_url,B.goods_type,B.goods_detail FROM shoppingcart A LEFT JOIN goods B ON A.goods_id = B.id WHERE A.user_no = ? AND B.goods_status=0  ";
        let res = await app.mysql.query(data, [user_no]);
        ctx.body = Result.success("查询成功", res);
    }

    async delete() {
        const { ctx, app } = this;
        console.log(ctx.request.body);
        let { id } = ctx.request.body;
        let sql = 'SELECT * FROM shoppingcart WHERE `id`=? ';
        let res = await app.mysql.query(sql, [id]);
        if(res.length==0){
            ctx.body = Result.fail("error")
        }else{
            let data='DELETE FROM shoppingcart WHERE `id`=?';
            let result = await app.mysql.query(data,[id]);
            ctx.body =  Result.success("删除成功",result);
        }
    }

}

module.exports = OrderController;