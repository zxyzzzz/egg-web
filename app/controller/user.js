'use strict';

let Result = require("../util/Result")

const { Controller } = require('egg');

class UserController extends Controller {
    
    async query(){
        const { ctx, app } = this;
        let sql = 'SELECT * FROM user_tb ';
        let result = await app.mysql.query(sql);
        ctx.body =  Result.success("查询成功",result);
    }

    async search(){
      const { ctx, app } = this;
      let {user_name} = ctx.request.body;
      let sqlName = 'SELECT * FROM user_tb WHERE `user_name` like ?  ';
      let res = null;
      if(user_name){
          res = await app.mysql.query(sqlName, [`%${user_name}%`]);
      }
      ctx.body =  Result.success("成功",res); 
  }

  async delete() {
    const { ctx, app } = this;
    console.log(ctx.request.body);
    let { id } = ctx.request.body;
    let sql = 'SELECT * FROM user_tb WHERE `id`=? ';
    let res = await app.mysql.query(sql, [id]);
    if(res.length==0){
        ctx.body = Result.fail("error")
    }else{
        let data='DELETE FROM user_tb WHERE `id`=?';
        let result = await app.mysql.query(data,[id]);
        ctx.body =  Result.success("删除成功",result);
    }
   
  }

  async edit(){
    const { ctx, app } = this;
    let {id} = ctx.request.body;
    let data='UPDATE user_tb SET `user_type`=2 WHERE `id`=? ';
    let result = await app.mysql.query(data,[id]);
    ctx.body =  Result.success("编辑成功",result);   

  }
}

module.exports = UserController;