'use strict';

let Result = require("../util/Result")

const { Controller } = require('egg');

class UserEditController extends Controller {
    async edit(){
        const { ctx, app } = this;
        let {user_no,head_img_url,sex,birth,tel,user_name} = ctx.request.body;
        let sql = 'SELECT * FROM user_tb WHERE `user_no`=? ';
        let res = await app.mysql.query(sql, [user_no]);
        if(res.length==0){
            ctx.body = Result.fail("error")
        }else{
            let data='UPDATE user_tb SET `head_img_url`=?,`sex`=?,`birth`=?,`tel`=?,`user_name`=? WHERE `user_no`=? ';
            let result = await app.mysql.query(data,[head_img_url,sex,birth,tel,user_name,user_no]);
            ctx.body =  Result.success("编辑成功",result);   
        }
    }
    async query(){
        const { ctx, app } = this;
        let sql = 'SELECT * FROM user_tb WHERE `user_no`=? ';
        let result = await app.mysql.query(sql,[ctx.request.body.user_no]);
        ctx.body =  Result.success("查询成功",result);
    }
}

module.exports = UserEditController;