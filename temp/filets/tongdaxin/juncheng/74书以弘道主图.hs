N:=5;
P1:=5;
P2:=13;
P3:=34;

{- 这个逻辑就有点奇怪，这是成交量，不会是个小数目，怎么跟0.01作比较呢 -}
JJJ:=IF(DYNAINFO(8)>0.01,0.01*DYNAINFO(10)/DYNAINFO(8),DYNAINFO(3));

DDD:=(DYNAINFO(5)<0.01 || DYNAINFO(6)<0.01);

JJJT:=IF(DDD,1,(JJJ<(DYNAINFO(5)+0.01) && JJJ>(DYNAINFO(6)-0.01)));

CYC1:IF(JJJT,0.01*EMA(AMOUNT,P1)/EMA(VOL,P1),EMA((HIGH+LOW+CLOSE)/3,P1)),COLORYELLOW;
CYC2:IF(JJJT,0.01*EMA(AMOUNT,P2)/EMA(VOL,P2),EMA((HIGH+LOW+CLOSE)/3,P2)),COLORMAGENTA;
CYC3:IF(JJJT,0.01*EMA(AMOUNT,P3)/EMA(VOL,P3),EMA((HIGH+LOW+CLOSE)/3,P3)),COLORGREEN;

CYC∞:IF(JJJT,DMA(AMOUNT/(100*VOL),100*VOL/FINANCE(7)),EMA((HIGH+LOW+CLOSE)/3,233)),COLORLIBLUE;

{- 用到了抛物转向SAR -}
BU:=CROSS(HIGH,SAR(3,1,20));
SEL:=CROSS(SAR(3,1,20),LOW);

DRAWTEXT(BU,LOW,'B'),COLORYELLOW,LINETHICK1;

DRAWTEXT(SEL,1.01*HIGH,'S'),COLORGREEN,LINETHICK1;

Z1:=STRCAT(HYBLOCK,' ');
Z2:=STRCAT(Z1,DYBLOCK);
Z3:=STRCAT(Z2,' ');

DRAWTEXT_FIX(ISLASTBAR,0,0,0,STRCAT(Z3,GNBLOCK)),COLOR00C0C0;

A1:=REF(H,N)=HHV(H,2*N+1);

B1:=FILTER(A1,N);
C1:=BACKSET(B1,N+1);
D1:=FILTER(C1,N);
A2:=REF(L,N)=LLV(L,2*N+1);
B2:=FILTER(A2,N);
C2:=BACKSET(B2,N+1);
D2:=FILTER(C2,N);
E1:=(REF(LLV(L,2*N),1)+REF(HHV(H,2*N),1))/2;

E2:=(H+L)/2;
H1:=(D1 AND NOT(D2 AND E1>=E2)) OR ISLASTBAR OR BARSCOUNT(C)=1;
L1:=(D2 AND NOT(D1 AND E1<E2));
H2:=D1 AND NOT(D2 AND E1>=E2);

X1:=REF(BARSLAST(H1),1)+1;
F1:=BACKSET(H1 AND COUNT(L1,X1)>0,LLVBARS(IF(L1,L,10000),X1));

G1:=F1>REF(F1,1);
I1:=BACKSET(G1,2);
LD:=I1>REF(I1,1);
L2:=LD OR ISLASTBAR OR BARSCOUNT(C)=1;
X2:=REF(BARSLAST(L2),1)+1;
F2:=BACKSET(L2 AND COUNT(H2,X2)>0,HHVBARS(IF(H2,H,0),X2));
G2:=F2>REF(F2,1);
I2:=BACKSET(G2,2);
HD:=I2>REF(I2,1);
R1:=BACKSET(ISLASTBAR,BARSLAST(HD)+1);
S1:=R1>REF(R1,1);
T1:=BACKSET(ISLASTBAR,BARSLAST(LD)+1);
U1:=T1>REF(T1,1);
R2:=BACKSET(S1,REF(BARSLAST(HD),1)+2);
S2:=R2>REF(R2,1);
T2:=BACKSET(U1,REF(BARSLAST(LD),1)+2);
U2:=T2>REF(T2,1);

NOTEXT1:DRAWLINE(S2,H,S1,H,1),LINETHICK1,COLORBLUE;
NOTEXT2:DRAWLINE(U2,L,U1,L,1),LINETHICK1,COLORLIRED;

STICKLINE(C>=CYC1 AND C>=O,C,O,3,0),COLOR0000AA;
STICKLINE(C>=CYC1 AND C>=O,C,O,2.5,0),COLOR0000BB;
STICKLINE(C>=CYC1 AND C>=O,C,O,2.0,0),COLOR0000CC;
STICKLINE(C>=CYC1 AND C>=O,C,O,1.5,0),COLOR0000DD;
STICKLINE(C>=CYC1 AND C>=O,C,O,1.0,0),COLOR0000EE;
STICKLINE(C>=CYC1 AND C>=O,C,O,0.5,0),COLOR0000FF;
STICKLINE(C>=CYC1 AND C>=O,H,L,0,0),COLOR0000FF;
STICKLINE(C>=CYC1 AND C<O,C,O,3,1),COLORRED;
STICKLINE(C>=CYC1 AND C<O,O,H,0,0),COLORRED;
STICKLINE(C>=CYC1 AND C<O,C,L,0,0),COLORRED;
STICKLINE(C<CYC1 AND C<=O,C,O,3,1),COLORAAAA00;
STICKLINE(C<CYC1 AND C>O,C,O,3,0),COLORAAAA00;
STICKLINE(C<CYC1 AND C>=O,C,O,2.5,0),COLORBBBB00;
STICKLINE(C<CYC1 AND C>=O,C,O,2.0,0),COLORCCCC00;
STICKLINE(C<CYC1 AND C>=O,C,O,1.5,0),COLORDDDD00;
STICKLINE(C<CYC1 AND C>=O,C,O,1,0),COLOREEEE00;
STICKLINE(C<CYC1 AND C>=O,C,O,0.5,0),COLORFFFF00;
STICKLINE(C<CYC1 AND C>=O,H,L,0,0),COLORFFFF00;
STICKLINE(C<CYC1 AND C>O,C,H,0,0),COLORGREEN;
STICKLINE(C<CYC1 AND C>O,O,L,0,0),COLORWHITE;

三日最低:=EMA((REF(L,4)+REF(L,3)+REF(L,2))/3,3);
三日最高:=EMA((REF(H,4)+REF(H,3)+REF(H,2))/3,3),COLORWHITE;
S:=CROSS(CROSS(三日最高,C),0.6);
B:=CROSS(CROSS(C,三日最低),0.5);
DRAWICON(B,LOW*0.99,34);
DRAWICON(S,H*1.00,35);
N1:=10;
T6:=CONST(HHVBARS(V,10)),COLOR0000FF,LINETHICK1;
量能平台:IF(CURRBARSCOUNT<=N1+15,CONST(IF(T6=0,C,REF(C,T6))),DRAWNULL),COLORFFFFFF,LINETHICK1;
新量能点:IF(CURRBARSCOUNT=T6+1,量能平台,DRAWNULL),CIRCLEDOT,COLORFFFFFF,LINETHICK9;
DRAWTEXT(ISLASTBAR,量能平台,' 量能平台'),COLOR00F0F0;
HV:=HHV(V,5)=V OR V/REF(V,1)>=5;
FT:=BARSLAST(HV);

量能平台1:=IF(HV,C,REF(C,FT));
DRAWTEXT(量能平台1>REF(量能平台1,1)AND C<REF(C,1),L,'*带量跌'),COLORGREEN;
DRAWTEXT(量能平台1<REF(量能平台1,1) AND C>REF(C,1),L,'*缩量涨'),COLORYELLOW;
DRAWTEXT(量能平台1>REF(量能平台1,1) AND C>REF(C,1) AND C>MA(C,13) AND C=HHV(C,20) AND C/REF(C,1)>1.05,L,'*突破量'),COLORFFFFFF;
