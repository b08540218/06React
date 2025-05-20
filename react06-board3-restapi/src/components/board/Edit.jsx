import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit(props) {
  // 페이지 이동을 위한 훅 사용
  const navigate = useNavigate();
  // 파라미터 읽어오기 위한 훅
  let params = useParams();
  console.log("수정idx",params.idx);

  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=board_news&idx="+params.idx+"&apikey=12f2bfb2d98295d12397b3e8e4466342";

  /** input의 value속성에 값을 설정하면 React는 readonly속성으로 렌더링한다.
  따라서 이 값을 수정하려면 반드시 스테이트가 필요하다. onChange 이벤트리스너
  에서 setter함수를 호출해서 값을 변경할 수 있다.
   */
  // input의 갯수만큼 스테이트를 생성한다.
  const[writer, setWriter] = useState('');
  const[title,setTitle] = useState('');
  const [contents, setContents] = useState('');

  // 열람 API를 호출하여 데이터를 얻어온다.
  useEffect(function(){
    fetch(requestUrl+"?"+parameter)
    .then((result)=>{
      return result.json();
    })
    .then((json)=>{
      console.log(json);
      // 얻어온 데이터를 파싱하여 스테이트의 setter함수를 호출한다.
      setWriter(json.name);
      setTitle(json.subject);
      setContents(json.content);
    });
    return ()=>{
      console.log('useEffect실행==>컴포넌트 언마운트');
    }
  }, []);
  return (<>
    <header>
      <h2>게시판-수정</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
      {/* 입력한 수정 후 전송 버튼을 누르면 submit 이벤트가 발생된다. */}
    <form onSubmit={
      (event)=>{
        event.preventDefault();
        // 폼값정리(일련번호를 포함해서 내용까지 4개의 값)
        let i = event.target.idx.value;
        let w = event.target.writer.value;
        let t = event.target.title.value;
        let c = event.target.contents.value;

        console.log(w,t,c);

        // 수정API호출
        fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {                
          // 1.전송방식 설정
          method: 'POST',
          // 2.헤더 설정 (컨텐츠타입, 캐릭터셋)
          headers: {
            'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
          // 수정이므로 idx가 포함되어야 한다.
          body: new URLSearchParams({
            tname: 'nboard_news',
            name: w,
            subject: t,
            content: c,
            idx: i,
            apikey: '12f2bfb2d98295d12397b3e8e4466342',
          }),
        })
        .then((response)=> response.json())
        .then((json)=> console.log('수정 응답',json));
        // 수정 후 열람페이지로 이동한다.
        navigate("/view/"+params.idx);
        // 경우에 따라서 목록으로 이동할수도 있다.
        // navigate("/list");
      }
    }>
      {/* 수정의 경우 개시물의 일련번호를 서버로 전송해야 하므로 아래와 같이
      hidden타입의 상자를 만들어서 값을 설정해야한다. hidden타입은 수정의
       대상이 아니므로 onChange 리스너는 필요하지 않다. */}
      <input type="hidden" name='idx' value={params.idx} />
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            {/* 스테이트에 저장된 값을 value에 설정하고, onChange 이벤트 리스너를
            통해 입력한 값을 실시간으로 변경해서 적용한다. */}
            <td><input type="text" name="writer" value={writer}
            onChange={(event)=>{
              setWriter(event.target.value);
            }}/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title" value={title}
            onChange={(event)=>{
              setTitle(event.target.value);
            }}/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" rows="3" value={contents}>
              onChange={(event)=>{
                setContents(event.target.value);
              }}</textarea></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="전송" />
    </form>    
    </article>
  </>);
}

export default Edit;