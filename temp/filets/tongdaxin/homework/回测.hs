MA1:=MA(CLOSE,5);
MA2:=MA(CLOSE,10);
MA3:=MA(CLOSE,20);
MA4:=MA(CLOSE,60)LINETHICK5;

AMOW:=AMOUNT/10000.0,VOLSTICK;
AMO1:=MA(AMOW,20);
AMO2:=MA(AMOW,90);

NTP:=AMO1<AMO2;

RSV:=(CLOSE-LLV(LOW,9))/(HHV(HIGH,9)-LLV(LOW,9))*100;
K:=SMA(RSV,3,1);
D:=SMA(K,3,1);

KD1:=IF(K<15 AND D<15, K AND D,DRAWNULL);

BUY(H<REF(H,1) AND L<REF(L,1) AND NTP AND KD1, C);

MA5:=MA(C,5);
MA60:=MA(C,90);

SELL(L>REF(L,1) AND H>REF(H,1) AND MA5/REF(MA60,1)>1.20, C);
AUTOFILTER;


