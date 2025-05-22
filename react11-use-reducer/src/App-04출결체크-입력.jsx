import { useReducer, useState } from "react";

/**
학생 컴포넌트 정의
컴포넌트에서 매개변수를 정의하는 2가지 방법
1.props라는 대표 매개변수를 사용한다. 이때는 2개 이상의 인수를 객체형태로
  받을 수 있으므로 'propls.속성명'과 같이 사용한다.
2.인수를 개별 변수로 전달받는다.
  {매개변수1, 매개변수2...N}
 */

const Student = ({name, dispatch,id,isHere})=>{
  return(<>
  <div>
    {/* 학생의 이름을 클릭하면 출석 기능이 토글됨.  */}
    <span style={{}}
    onClick={()=>{
      alert('출석처리');
    }}>{name}</span>
    {/* 삭제 버튼 */}
    <button onClick={()=>{
      alert('삭제');
    }}>삭제</button>
  </div>
  </>)
}
// 디듀서 함수 선언
const rendcer = (state, action) =>{
  switch (action.type) {
    case 'add':
      /* 학생 이름을 액션객체를 통해 읽어온다. (dispatch함수에서 전달하는
      액션객체를 참조) */
      const name = action.param.name;
      // 추가를 위한 새로운 객체 생성
      const newStudent = {
        id: Date.now(),
        name, /** 이름은 key와 value가 동일하므로 하나만 작성 */
        isHere: false, /** 출석여부 */
      }
      return{
        // 학생수 증가
        count: state.count + 1,
        // 스프레드 연산자로 기존 배열에 새로운 객체를 추가
        students: [...state.students,newStudent],
      }
      case 'delete':
        return{

        }
      case 'mark':
        return{

        }
    default:
  }
}
// 앱에서 사용할 데이터 객체로 학생수와 학생의 정보를 담은 배열로 정의.
const initialState ={
  count :1,
  students : [
    {
      id: Date.now(), name:'김철수', isHere: false,
    },
  ],
}
function App() {
  // 학생이름 입력을 위한 input상자에서 사용할 스테이트 
  const [name,setName] = useState('');
  /* 리듀서 변수 생성 및 함수 생성. studentInfo의 초기값은 앞에서 생성한
  데이터 객체로 정의*/
  const [studentInfo, dispatch] = useReducer(rendcer, initialState);
  return (<>
<div className="App">
  <p>총학생수 : {studentInfo.count}</p>
  {/* 추가할 학생의 이름을 입력하기 위한 상자 */}
  <input type="text" placeholder='이름을입력하세요.' 
  value={name} onChange={(e) =>{
    setName(e.target.value)
  }}/>
  {/* 버튼을 누르면 디스패치를 통해 액션객체를 리듀서로 전달해서
  학생을 추가한다. 특히 param의 Value는 객체로 정의되어 있다. */}
  <button onClick={()=>{
    dispatch({type:'add', param:{name}});
  }}>추가</button>
  {
    // 데이터에 입력된 학생수만큼 반복해서 <Student>컴포넌트를 출력한다.
    studentInfo.students.map((student) =>{
      // 컴포넌트에서 사용할 값을 프롭스로 전달
      return <Student key={student.id} name={student.name}
      dispatch={dispatch} id={student.id}
      isHere={student.isHere}/>
    })
  }
</div>
  </>);
}
export default App;
