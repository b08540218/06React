import { useState } from "react";

function WriteForm(props) {
  return(
    // submit 이벤트리스너를 통해 폼값을 처리한다.
    <form onSubmit={(e)=>{
      // 이벤트리스너에서는 event객체를 매개변수로 받을 수 있다.
      // 이벤트 객체를 통해 submit 이벤트를 차단한다.
      e.preventDefault();
      // 이벤트의 target 속성을 통해 입력한 값을 읽어온다.
      let writer = e.target.writer.value;
      let title = e.target.title.value;
      let contents = e.target.contents.value;
      /* 부모 컴포넌트에서 프롭스로 전달해준 함수를 호출하여 폼값을
      전달한다 */
      props.writeAction(title,writer,contents);
    }}>
      <table border='1'>
    <tbody>
      <tr>
        <th>작성자</th>
        <th><input type="text" name="writer" /></th>
      </tr>
      <tr>
        <td>제목</td> 
        <td><input type="text" name="title" /></td>
      </tr>
      <tr>
        <td>제목</td> 
        <td><textarea name="contents" cols='22'
        rows='3'></textarea></td>
      </tr>
    </tbody>
      </table>
      <input type="submit" value="전송"/>
    </form>
  )
}

function App() {
  // message 라는 스테이트 생성
  const [message, setMessage] = useState('폼값 검증 진행중');


  return (
  <div className="App"> 
      <h2>React - Form값처리</h2>
      {/* 작성폼 컨포넌트를 추가하면서 프롭스를 통해 폼 값을 받아 콘솔에
      출력하는 함수를 전달한다. */}
    <WriteForm writeAction={(wr,ti,con) =>{
      // 콘솔에서 확인
      console.log("Form값", wr, ti, con);
      // 3개의 모든 값을 입력하면 스테이트를 '완료'로 변경한다
      if(wr!=='' && ti!=='' && con!==''){
        // 스테이트가 변경되면 리렌더링이 된다.
        setMessage('폼값 검증 완료');
      }
    }}></WriteForm>
    {/* 스테이트가 변경되면 리렌더링 되므로 아래 텍스트가 변경되는
    것을 볼수있다. 즉 폼값검증이 완료되었을때 변경된다. */}
    <p>{message}</p>
  </div>
  );
}

export default App
