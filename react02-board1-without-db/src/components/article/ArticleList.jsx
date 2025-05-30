function ArticleList(props) {
  const lists = props.boardData.map((row) => (
    <tr key={row.no}>
      <td className="cen">{row.no}</td>
      <td>
        {/* 제목을 클릭하면 열람으로 전환하기 위한 링크 생성 */}
        <a href={'./read/' + row.no} onClick={(event) => {
          event.preventDefault();
          // 각 게시물의 일련번호를 인수로 전달(화면전환도 같이 처리됨)
          props.onChangeMode(row.no);
        }}>
          {row.title}
        </a>
      </td>
      <td className="cen">{row.writer}</td>
      <td className="cen">{row.date}</td>
    </tr>
  ));

  return (
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
    </article>
  );
}

export default ArticleList;
