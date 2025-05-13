
/*
컨포넌트는 일반적인 JavaScript 함수와 같이 생성한다.
단 return문에 삽입된 컨텐츠가 텐더링 되므로 필수로 작성되어야 한다.
*/
function MyBody() {
  return (<> 
        <h2>React - 기본</h2>
    <ol>
      <li>프론트앤드</li>
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Javascript</li>
          <li>jQuery</li>
        </ul>
        <li>백엔드</li>
        <ul>
          <li>Javascript</li>
          <li>Oracle</li>
          <li>Javascript</li>
          <li>Spring Boot</li>
        </ul>
      </ol>
    </>
  );
}

function App() {
  return(
    <div className="App">
      <h2>React - 컴포넌트 만들기</h2>
      {/* 컨포넌트 삽입시에는 HTML태그와 같이 기술하면 된다. 단 반드시
      닫는 태그가 있어야 한다. */}
      <MyBody></MyBody>
      {/* 쌍(pair)으로 작성하지 않는다면 아래와 같이 self-closing형식으로
      적성할 수 있다. */}
      <MyBody/ >
    </div>
  );
}

export default App
