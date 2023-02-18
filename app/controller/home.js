'use strict';

let fs = require("fs");
let path = require("path");

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.cookies.set("name","jack",{httpOnly:false,encrypt:true})
    // ctx.body = 'hi, egg';
    let filePath = path.resolve(process.cwd(),"1.jpeg");
    let fileName = "1.jpeg";
    ctx.attachment(fileName,{
      fallback:true,
      type:'attachment' // [string] attachment/inline
    });

    const fileSize = fs.statSync(filePath).size;
    ctx.set('Content-Length',fileSize) 
    ctx.set('Content-Disposition',`attachment; filename=${fileName}`)
    ctx.body = fs.createReadStream(filePath)
  }
  async postTest(){
    const {ctx,app} = this;
    let res = await app.mysql.query("SELECT * FROM employee_tbl", [])
    ctx.body = {
      name:"jack",
      age:22,
      xx:ctx.query.xx,
      yy:ctx.params.yy,
      csrf:ctx.csrf,
      fileDir:this.config.fileDir,
      res:res
    };
  }
  async getTest(){
    const {ctx} = this;
    ctx.body = {
      name:"get",
      age:22,
      xx:ctx.query.xx,
      yy:ctx.params.yy,
      csrf:ctx.csrf
    };
  }
}

module.exports = HomeController;
