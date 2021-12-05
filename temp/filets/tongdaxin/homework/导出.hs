N:=120;
R:=0.6;
一波下跌:=C<HHV(C,N)*R;

N1:=40;
MA60:=MA(C,60);
突破:=CROSS(C,MA60);
上一次突破:=BARSSINCEN(突破,N1);

选股条件:一波下跌 AND 突破 AND 上一次突破;
