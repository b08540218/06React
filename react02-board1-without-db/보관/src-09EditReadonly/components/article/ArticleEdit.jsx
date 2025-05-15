
/** 
수정페이지를 구성하기 위해 기존 데이터를 프롭스로 받은 후 input의 value
속성값으로 설정한다.
하지만 이 경우 input이 readOnly 속성으로 렌더링되어 기존의 내용을 수정할 수
없게된다.
React에서 프롭스는 외부에서 내부로 전달되는 일종의 파라미터(인수) 이므로
수정할 수 없도록 '읽기전용'  으로 설정되어 있다
*/
function ArticleEdit(props) {
  return(
    <article>
      <form onSubmit={(event)=>{
        // 제출되는것을 차단
        event.preventDefault();

        // 이벤트 객체의 target속성으로 form하위 태그에 접근하여 value를 읽어온다.
        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;

        // 3개의 폼값을 부모로 전달하여 쓰기처리 한다.
        props.editAction(title, writer, contents);
      }}>
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type='text' name="writer"
              value={props.selectRow.writer}/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type='text' name="title"
              value={props.selectRow.title}/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" rows='3'
              value={props.selectRow.contents}></textarea></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="수정하기" />
      </form>
    </article>
  );
}
export default ArticleEdit;