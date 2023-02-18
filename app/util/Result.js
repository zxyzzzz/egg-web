function Result(errorcode,message,data,){
    this.message = message;
    this.data = data;
    this.errorcode = errorcode;
}
Result.success = function(message,data){
    return new Result(0,message,data);
}
Result.fail = function(message,data){
    return new Result(1,message,data);
}
module.exports = Result;