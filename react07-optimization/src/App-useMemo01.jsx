import { useState, useMemo } from "react";



function App() {
  // 스테이트 생성
  const [longTimeNum, setLongTimeNum] = useState(0);
  const [simpleNumner, setSimpleNumber] = useState(true);

  /**
  Step1 : App 컴포넌트가 렌더링 되면 아래 2개의 함수를 호출하여 반환된
    값으로 설정된다. 매개변수로 스테이트가 인수로 전달된다. 
    따라서 렌더링될때마다 2개의 함수는 모두 실행되어 성능에 영향을 
    미치게된다
   */
  // const longTimeSum = longTimeCalculate(longTimeNum);
  // const simpleSum = simpleCalculate(simpleNumner);


  /**
  Step2 : 시간이 많이 걸리는 함수를 호출한 후 반환되는 값을 useMemo를
    통해 메모이제이션 한다. 이 값은 longTimeNum이 변경될때만 다시 함수를 
    호출하므로, short버튼을 눌럿을때 실행되지 않는다 즉 렌더링시
    불필요하게 함수가 실행되는 것을 차단할 수 있으므로 성능이 향샹된다.
   */
  const longTimeSum = useMemo(() => {
    return longTimeCalculate(longTimeNum)
  }, [longTimeNum]);
  const simpleSum = simpleCalculate(simpleNumner);

  return (<>
    <div className="App">
      {/* input 상자의 스핀박스를 누를때마다 핸들러에서 각 setter 함수를
        호출한다. 이 입력값을 통해 스테이트를 변경한다. */}
      <h2>Long Time 계산기</h2>
      <input type="number" value={longTimeNum}
        onChange={(e) => setLongTimeNum(parseInt(e.target.value))}
      />
      <span> + 10000 = {longTimeSum}</span>

      <h2>Short Time 계산기</h2>
      <input type="number" value={simpleNumner}
        onChange={(e) => setSimpleNumber(parseInt(e.target.value))}
      />
      <span> + 1 = {simpleSum}</span>
    </div>
  </>)
}
export default App
