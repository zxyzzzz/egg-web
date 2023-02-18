module.exports = (options, app) => {
    return async function (ctx, next) {
        ctx.set('Access-Control-Allow-Origin', '*');
        const startTime = Date.now()
        console.log('-----',ctx.session);
        // if(!ctx.session.user_no){
        //     throw new Error("用户未登录")
        // }
        await next()
        const consume = Date.now() - startTime
        const { threshold = 0 } = options || {}
        
  
        if (consume > threshold) {
            console.log(`${ctx.url}请求耗时${consume}毫秒`)
        }
    }
}