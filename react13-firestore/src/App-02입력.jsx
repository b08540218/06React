import { useState } from "react";
import { firestore } from "./firestoreConfig";
import { doc, setDoc } from "firebase/firestore";

function App() {
  console.log("firestore",firestore);

  // 오늘의 날짜를 만들기 위한 함수
  const nowDate = () =>{
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0"+ (1 + dateObj.getMonth())).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);
    return year +"-"+month+"-"+day;
  }

  // 회원정보입력. 매개변수는 컬렉션명~이름까지의 정보를 받도록 선언. 
  const memberWrite = async (p_collection, p_id, p_pass, p_name) =>{
    // doc으로 입력을 위한 컬렉션과 도큐먼트를 만든 후 JS객체로 정보 추가
    await setDoc(doc(firestore, p_collection, p_id),{
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log("입력성공");
  }

  // 컬렉션명 수정을 위한 스테이트
  const[collName, setcollName] = useState('members');

  return (
    <>
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>입력하기</h3>
      <form onSubmit={(event)=>{
        event.preventDefault();

        // 폼값 얻기
        let collection = event.target.collection.value;
        let id = event.target.id.value;
        let pass = event.target.pass.value;
        let name = event.target.name.value;

        // 폼값에 빈값이 있는지 검증
        if(id===''){alert('아이디를 입력하세요.'); return;}
        if(pass===''){alert('비밀번호를 입력하세요.'); return;}
        if(name===''){alert('이름을 입력하세요.'); return;}

        // 회원정보 추가
        memberWrite(collection, id, pass, name);
        
        // 다음 입력을 위해 입력폼을 비워준다.
        event.target.id.value = '';
        event.target.pass.value = '';
        event.target.name.value = '';
      }}>

      <table className='table table-bordered table-striped'>
        <tr>
          <td>컬렉션(테이블)</td>
          {/* value속성에 문자열을 추가하면 readonly속성으로 렌더링되어
          값을 수정할 수 없게된다. 이런경우 onChange 이벤트 리스너를 통해
          스테이트를 수정하는 방식으로 변경해야한다. */}
          <td><input type="text" name="collection"
            value={collName}
            onChange={(e)=>{
              setcollName(e.target.value)
            }} /></td>
        </tr>
        <tr>
          <td>아이디</td>
          <td><input type="text" name="id" /></td>
        </tr>
        <tr>
          <td>비밀번호</td>
          <td><input type="text" name="pass" /></td>
        </tr>
        <tr>
          <td>이름</td>
          <td><input type="text" name="name" /></td>
        </tr>
      </table>
      <button type="submit">입력</button>
      </form>
    </div>
    </>
  )
}

export default App
