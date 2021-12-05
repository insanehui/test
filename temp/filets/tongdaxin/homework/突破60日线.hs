{- 当前突破60日线 -}
MA60:=MA(C,60);
突破:=CROSS(C,MA60);
上一次:=BARSSINCEN(突破,40);
条件:突破 AND 上一次;
