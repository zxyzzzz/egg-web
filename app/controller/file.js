'use strict';

let fs = require("fs");
let path = require("path");
let loginService = require("../services/loginService")
let Result = require("../util/Result")


const { Controller } = require('egg');

class FileController extends Controller {
    async upload(){
        const { ctx, app,config } = this;
        let localFileDir = ctx.request.body.localFileDir||"";
        
        let file = ctx.request.files[0]
        // 3 读取文件内容
        let f = fs.readFileSync(file.filepath)

        // 7 返回图片保存的完整路径
        let dirPath = path.resolve(config.fileDir,localFileDir);
        fs.mkdirSync(dirPath,{recursive: true})
        let uploadDir = path.join(dirPath,file.filename);

        fs.writeFileSync(uploadDir, f);

        ctx.body =  Result.success("编辑成功",{
            url:localFileDir+"/"+file.filename
        });  
    }

    async download(){
        const { ctx, app,config } = this;
        let url = ctx.query.url
        const filePath = path.resolve(config.fileDir,url);
        // const fileSize = (await promisify(stat)(filePath)).size.toString();
        this.ctx.attachment(filePath);
        // this.ctx.set('Content-Length', fileSize);
        this.ctx.set('Content-Type', 'application/octet-stream');
        this.ctx.body = fs.createReadStream(filePath);
          
    }
}

module.exports = FileController;