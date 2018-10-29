const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const views = require('koa-views')

mongoose.connect('mongodb://localhost/mongoose');
const app = new Koa();
const router = new Router({
  prefix: '/api/'
})

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    let { name, message } = e
    ctx.status = 500
    ctx.body = {
      name,
      message
    }

    switch (message) {
      case 'invalid token':
        ctx.body.message = '无效的token'
        break
      case 'jwt must be provided':
        ctx.body.message = '请先登录'
        break
    }
  }
})
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())




require('./route/routes')(router)

function func(n){
  if(n==1) return 1;
  return func(n-1) + n;
}
console.log(func(100));





app.listen(3000);