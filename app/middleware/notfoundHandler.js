module.exports = () => {
    return async function (ctx, next) {
      await next()
      if (ctx.status === 404) {
        // ctx.body = ctx.acceptJSON ? { error: 'Not Found11' } : '<h1>Page Not Found11</h1>'
        ctx.status = 404;
        ctx.body = { 
            error1: 'Not Found11' 
        };
      }
    }
  }
