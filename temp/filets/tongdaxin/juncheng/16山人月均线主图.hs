{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
MA5:MA(CLOSE,5);
MA21:MA(CLOSE,21),LINETHICK2;
MA55:MA(CLOSE,55),LINETHICK2.5;
MA89:MA(CLOSE,89),LINETHICK3;
DRAWTEXT_FIX(1,0.00,0,0,'所属行业：')COLOR0080FF;
DRAWTEXT_FIX(1,0.07,0,0,HYBLOCK)COLOR0080FF;
DRAWTEXT_FIX(1,0.14,0,0,'所属地区：')COLOR00FFFF;
DRAWTEXT_FIX(1,0.21,0,0,DYBLOCK)COLOR00FFFF;
DRAWTEXT_FIX(1,0.00,0.06,0,'主题投资：')COLOR0000FF;
DRAWTEXT_FIX(1,0.07,0.06,0,EXTERNSTR(0,1))COLOR0000FF;
DRAWTEXT_FIX(1,0.00,0.12,0,'千股千评：')COLORFF00FF;
DRAWTEXT_FIX(1,0.07,0.12,0,EXTERNSTR(0,2))COLORFF00FF;
DRAWTEXT_FIX(1,0.00,0.18,0,'出千概念：')COLORFF88FF;
DRAWTEXT_FIX(1,0.07,0.18,0,EXTERNSTR(0,3))COLORFF88FF;
DRAWTEXT_FIX(1,0.00,0.24,0,'业绩报告：'),COLOR00FFFF;
DRAWTEXT_FIX(1,0.09,0.24,0,EXTERNSTR(0,4)),COLOR00FFFF;
A1:MA(CLOSE, 5);
A2:(MA(CLOSE,3)+MA(CLOSE,6)+MA(CLOSE,12)+MA(CLOSE,24))/4;
A3:(MA(CLOSE,5)+MA(CLOSE,10)+MA(CLOSE,20)+MA(CLOSE,40))/4,LINETHICK2,COLORWHITE;
MM1:=BARSCOUNT(C);
MM2:=BARSCOUNT(O);
A无穷线:MA(CLOSE,MM2),LINETHICK1,COLORMAGENTA;
B无穷线:MA(CLOSE,MM1),LINETHICK2,COLORYELLOW;
TJ:=DYNAINFO(4)>0 AND HHV(HIGH,10)/LLV(LOW,10)<1.25 AND REF(CLOSE,1)<(LLV(LOW,15)+(HHV(HIGH,15)-LLV(LOW,15))*0.85) AND CLOSE>OPEN AND CLOSE>=HHV(HIGH,10);
DRAWTEXT(TJ,L-0.2, '▲放量突破'),COLORRED;
STICKLINE(TJ,O,C,4,0),COLORRED;
STICKLINE(TJ,H,L,1.5,0),COLORYELLOW;