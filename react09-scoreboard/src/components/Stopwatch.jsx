import { useRef, useState } from "react";

export default function Stopwatch(props) {
  
  // 스탑워치가 동작중인지 확인을 위한 스테이트
  const [timerFlag, setTimerFlag] =useState(false);
  // 타이머에서 사용할 시간 
  let[ticker, setTicker] = useState(0);
  // 타이머를 중단할때 사용할 Ref변수
  let timerRef = useRef(0);

  // 스탑워치 시작
  const startTimer = ()=>{
    ticker++;
    // 1초에 한번씩 증가된 값으로 스테이트를 변경한다.
    timerRef.current=setInterval(() => {
      console.log('틱톡');
      // 세터 함수를 호출해서 리렌더링 
      setTicker(ticker++);
    }, 1000);
  }

  // 스탑워치 중지(Ref 변수를 이용해서 함수 호출)
  const stopTimer = () =>{
    clearInterval(timerRef.current);
  }
  console.log('timerRef', timerRef);
  
  return (<>
    <div className="stopwatch">
      <h1 className="h1">StopWatch</h1>
      {/* 시간 표시 */}
      <span className="stopwatch-time">{0}</span>
      {/* 시작/중지 버튼 */}
      <button onClick={()=>{
        // 시작/중지를 토글해서 스테이트를 변경
        setTimerFlag(!timerFlag);
        /** 토글된 상태에 따라 각기 다른 함수의 호출과 버튼의 타이틀도
          변경한다. */
        (timerFlag===true) ? stopTimer() : startTimer() ;
      }}>{(timerFlag===false) ? 'Start' : 'Stop'}</button>
      {/* 리셋 버튼 */}
      <button onClick={()=>{
        // 타이머가 동작중일때 누르면 경고창을 띄운다.
        if (timerFlag==true) 
          alert('StopWatch가 동작중입니다.');
         else 
          // 타이머가 중지중인 상태라면 0으로 리셋한다.
          setTicker(0);
        }}>Reset</button>
    </div>
  </>);
}