// koa-router�ıʼ�
/*
 * koa-router�������
 * 1��·�����ṩ·�ɷ������Խ������м��
 * 2��·���������м���ӿڣ��Խ�koa
 */

var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

// ·�ɷ���
router.get('/test', function (ctx, next) { // ����koa��׼���м���ӿ�
  ctx.body = 'router!'
})

/*
 * router������Ϊ�м������routes()��������Ϊ�м���ӿ�
 */
app.use(router.routes())
app.listen(3000)


