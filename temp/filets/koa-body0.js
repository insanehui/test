/*
 * koa-body���÷�
 */
import Koa from 'koa'
import koaBody from 'koa-body'

const app = new Koa();

/*
 * ʹ��koa-body�м������˼�
 * �����ȱʡ�����Ѿ���Ӧ�Զ������
 */
app.use(koaBody()) 
app.use(ctx => {

  /* 
   * ����koa-body�м���Ĵ��������Ի�ȡ�õ�post�Ĳ���body������ctx.request.body����
   * �ĵ�˵ctx.req.body�ƺ��ǲ��Ե�
   */
  console.log(ctx.request.body) 
  ctx.body = JSON.stringify(ctx.request.body, null, '  ')
});

app.listen(3000);
