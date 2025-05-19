import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit(props) {
  // 페이지 이동을 위한 훅 사용
  const navigate = useNavigate();
  let params = useParams();
  console.log("수정idx",params.idx);

  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=board_news&idx="+params.idx;

  const[writer, setWriter] = useState('');
  const[title,setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(function(){
    fetch(requestUrl+"?"+parameter)
    .then((result)=>{
      return result.json();
    })
    .then((json)=>{
      console.log(json);
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
    <form onSubmit={
      (event)=>{
        event.preventDefault();
        // 입력한 폼값 읽어오기 
        let i = event.target.idx.value;
        let w = event.target.writer.value;
        let t = event.target.title.value;
        let c = event.target.contents.value;

        console.log(w,t,c);

        // 작성 API 호출
        /** fetch함수를 통해 post방식으로 요청을 해야하는 경우
         * 두번째 인수가 필요하다.
         */
        fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {                
          // 1.전송방식 설정
          method: 'POST',
          // 2.헤더 설정 (컨텐츠타입, 캐릭터셋)
          headers: {
            'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
          /**
          3.작성자가 입력한 폼값을 JSON형식으로 조립하여 전송한다.
          URLSearchParams객체는 JSON형식의 데이터를 쿼리스트링 형식으로
          변환해준다.
           */
          body: new URLSearchParams({
            tname: 'nboard_news',
            name: w,
            subject: t,
            content: c,
            idx: i,
            // apikey: '12f2bfb2d98295d12397b3e8e4466342',
          }),
        })
        .then((response)=> response.json())
        .then((json)=> console.log('수정 응답',json));
        // 글쓰기가 완료되면 목록으로 이동한다.
        navigate("/list");
      }
    }>
      <input type="hidden" name='idx' value={params.idx} />
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
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