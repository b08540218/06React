import { useMemo } from "react";
import { useState, useEffect } from "react";



function App() {
  const [number, setNumber] = useState(0);
  const [switching, setWsitching] = useState(true);

  /**
  Step1 : 상수를 선언하고, 초기값은 On으로 설정함.
   */
  // const switchMode = switching ? 'On(켜짐)':'Off(꺼짐)';

  /**
  Step2 : 상수를 객체로 변경
    JavaScript에서는 객체를 선언할때마다 새로운 참조값을 할당하게된다.
    즉 새로운 렌더링을 위해 App 컴포넌트가 호출될때마다 참조값이 변경된다.
    따라서 useEffect()가 지속으로 호출된다. 즉 불필요한 실행이 발생되게
    된다.
   */
  // const switchMode = {
  //   nowState : switching ? 'On(켜짐)':'Off(꺼짐)'};

  /**
  Step3 : useMemo를 적용하여 switching의 값이 변경될때만 값을 반환하고
    그렇지 않으면 메모이제이션 된 값을 그대로 사용한다.
   */
  const switchMode = useMemo(()=>{
    return {nowState : switching ? 'On(켜짐)' : 'Off(꺼짐)'};
  }, [switching]);
  

    /**
  Step1 : 기본(원시) 타입의 값을 의존성 배열에 추가했으므로, 값의 변화가
    있을때만 useEffect가 재실행된다.
  Step2 : 객체형으로 변경하면 App컴포넌트가 렌더링될때마다 새로운 참조값이
    할당되므로 값이 변경된것으로 인식하여 useEffect가 지속으로 호출되는
    문제가 생긴다. 즉 애플리케이션의 성능이 저하될 수 있다.
  STep3 : App컴포넌트가 렌더링될때마다 지속적으로 참조값이 변경되는 부분을
    차단하기 위해 useMemo를 통해 Momooization한 값을 사용하도록 코드를 수정
    하면 switchMode가 변경될때만 useEffect를 재실행한다.
   */
  useEffect(()=>{
    console.log("useEffect() 호출됨");
  }, [switchMode]);

  return (<>
    <div className="App">
      {/* 스핀버튼을 누르면 정수 스테이트가 변경된다. */}
      <h2>정수 카운터</h2>
      <input type="number" value={number}
      onChange={(e)=> setNumber(e.target.value)}
       />
       <hr />
       <h2>토글 스위치</h2>
       {/* Step1 : 원시(기본) 자료형일때의 출력 */}
       {/* <p>스위치상태(Step1): {switchMode}</p> */}

        {/* Step2 : 객체(참조)형 일때의 출력 */}
       <p>스위치상태(Step1): {switchMode.nowState}</p>
       <button onClick={()=> setWsitching(!switching)}>
        스위치조작</button>
    </div>
  </>)
}
export default App
