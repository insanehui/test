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

// ·�ɷ��������˱�׼��get, post, ��put...�������Ѳ����ã�������all
router.all('/test', function (ctx, next) { // ����koa��׼���м���ӿ�
  // all֧�����з���
  ctx.body = 'router!'
}/*
, middleWare2, .... // ������ʵ���ԽӶ������������м��
*/)

/*
 * router������Ϊ�м������routes()��������Ϊ�м���ӿ�
 */
app.use(router.routes())
app.listen(3000)


