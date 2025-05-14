function ViewComponent(props){
  return (<>
    <header>
    <h2>게시판-읽기</h2>
  </header>
  <nav>
      <a href="/" onClick={(event)=>{
        event.preventDefault();
        props.changeMode('list');
      }}>목록</a>&nbsp;&nbsp;
    <a href="/" onClick={(e)=>{
      alert('수정');
      e.preventDefault();
    }}>수정</a>&nbsp;&nbsp;
    <a href="/" onClick={(e)=>{
      alert('삭제');
      e.preventDefault();
    }}>삭제</a>
  </nav>
  <article>
    <table id="borderTable">
    <colgroup>
    <col width="30%"/><col widthd="*" />
    </colgroup>
    <tbody>
      <tr>
        <th>작성자</th>
        <th>성유겸</th>
      </tr>
      <tr>
        <th>제목</th>
        <td>오늘은 React공부하는날</td>
      </tr>
      <tr>
        <th>날짜</th> 
        <td>2023-05-05</td>
      </tr>
      <tr>
        <th>내용</th>
        {/* br태그도 self-closing으로 표현해야 한다. */}
        <td>열심히 해봅시다<br/>열공 합시다.</td>
      </tr>
    </tbody>
    </table>
  </article>
  </>);
}
export default ViewComponent;