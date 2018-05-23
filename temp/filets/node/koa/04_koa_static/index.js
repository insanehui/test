const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const app = new Koa()

process.title = 'koa'

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(serve(
  path.join( __dirname,  staticPath)
))

app.listen(51312, () => {
  console.log('[demo] static-use-middleware is starting')
})

