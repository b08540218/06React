
const Board = (props) =>{
  return(<>
  <h2>읽기 (Read) - 댓글작성</h2>
  <form name="writeFrm">
    <input type="hidden" name="num" value="1"/>
    <table id="boardTable">
    <tbody>
      <tr>
        <th>번호</th>
        <td>테스트</td>
        <th>작성자</th>
        <td>테스터123</td>
        <td colSpan="4" align="center">
          <button type="button" onClick={()=>{}}>수정</button>
          <button type="button" onClick={()=>{}}>삭제</button>
          <button type="button" onClick={()=>{}}>목록</button>
        </td>
      </tr>
    </tbody>
    </table>
  </form>
  </>)
}
export default Board;