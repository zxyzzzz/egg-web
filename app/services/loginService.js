let loginDb = require("../db/login")

module.exports.login = async function(app,params){
    let res = await loginDb.login(app,params);
    return res;
}