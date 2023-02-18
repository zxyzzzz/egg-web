module.exports.login = async function(app,params){
    let res = await app.mysql.query("SELECT id,password FROM user_tb", [])
    // let insertImp = "INSERT INTO `test`.`employee_tbl` ( `name`, `date`, `signin`) VALUES (?,?,?)"
    // let res = await app.mysql.query(insertImp, ['小明1', '2016-04-22 15:25:33', 1])
    // return res;
}