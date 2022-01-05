{- 一波下跌 -}

N:=120;
R:=0.5;
一波下跌:=C<HHV(C,N)*R;

起涨:=UPNDAY(C,2) AND NDAY(C,O, 2);

处于低位:=LLV(L,10)=LLV(L, N);

选股:一波下跌 AND 处于低位 AND 起涨;
