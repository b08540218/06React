import { firestore } from './firestoreConfig';
import { doc, deleteDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  const [showData, setShowData] = useState([]);

  // 기존의 도큐먼트를 불러와서 select태그에 설정
  useEffect(() => {
    const getCollection = async () => {
      let trArray = [];
      const querySnapshot = await getDocs(collection(firestore, "members"));
      querySnapshot.forEach((doc) => {
        let memberInfo = doc.data();
        trArray.push(
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    }
    // 함수 호출 후 콜백 데이터를 then절에서 처리
    getCollection().then((result) => {
      console.log('result', result);
      // 스테이트를 변경하면 리렌더링 되면서 option이 추가된다.
      setShowData(result);
    });
  }, []);
  /** useEffect의 두번째 인자인 의존성 배열은 빈배열을 적용하여 렌더링 후
    딱 한번만 실행되도록 처리한다.
   */

  // input 태그에 설정된 값을 수정하기 위한 스테이트
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
}
return (
  <>
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>개별 조회 및 삭제하기</h3>
      <form onSubmit={async (event) => {
        event.preventDefault();
        let id = event.target.id.value;
        console.log("선택", id);
        if (id === '') { alert('사용자를 먼저 선택해주세요.'); return; }

        /** 선택한 아이디로 도뮤먼트의 참조를 얻은 후에 deleteDoc 함수를
          실행해서 삭제한다.
         */
        await deleteDoc(doc(firestore, "members", event.target.id.value));
        setId('');
        setPass('');
        setName('');
      }}>
        <div class="input-group" id="myForm">
          <select className="form-control" onChange={async (e) => {
            // select에서 선택한 항목의 데이터를 불러와서 input에 설정
            let user_id = e.target.value;
            const docRef = doc(firestore, "members", user_id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              let callData = docSnap.data();
              setId(user_id);
              setPass(callData.pass);
              setId(callData.name);
            } else {
              console.log("No such document!");
            }
          }}>
            <option value="">선택하세요.</option>
            {showData}
          </select>
          <button type="submit" className='btn btn-danger'>삭제</button>
        </div>
        <table className='table table-bordered'>
          <tbody>
            <tr>
              <td>컬렉션(테이블)</td>
              <td><input type="text" name="collection" value="members"
                className="form-control" /></td>
            </tr>
            <tr>
              <td>아이디(변경불가)</td>
              <td><input type="text" name="id" value={id} className="form-control" /></td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td><input type="text" name="pass" value={pass} className="form-control" /></td>
            </tr>
            <tr>
              <td>이름</td>
              <td><input type="text" name="name" value={name} className="form-control" /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">입력</button>
      </form>
    </div>
  </>
);

export default App;
