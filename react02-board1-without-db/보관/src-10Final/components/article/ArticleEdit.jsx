
/** 
수정페이지를 구성하기 위해 기존 데이터를 프롭스로 받은 후 input의 value
속성값으로 설정한다.
하지만 이 경우 input이 readOnly 속성으로 렌더링되어 기존의 내용을 수정할 수
없게된다.
React에서 프롭스는 외부에서 내부로 전달되는 일종의 파라미터(인수) 이므로
수정할 수 없도록 '기전용'  으로 설정되어 있다
*/

import { useState } from "react";

function ArticleEdit(props) {
  /**
  위와 같은 문제로 프롭스를 스테이트에 저장한 후 onChange 이벤트 리스너를
  통해 설정된 값을 수정할 수 있도록 변경해야한다.
  input의 갯수만큼 스테이트를 생성한다, 프롭스로 전달된 데이터를 스테이트에
  저장한 후 변환함수까지 정의한다.
  이렇게 하면 프롭스는 그 값을 동일하게 유지하게되고, 복사본인 스테이트만
  변경되는 구조가 된다.
   */
    const [title,setTitle] = useState(props.selectRow.title);
    const [writer, setWriter] = useState(props.selectRow.writer);
    const [contents, setContents] = useState(props.selectRow.contents);

  return(
    <article>
      <form onSubmit={(event)=>{
        // 제출되는것을 차단
        event.preventDefault();

        // 폼값 전송시 이벤트 객체를 통해 읽어와서 변수에 저장
        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;

        // 수정을 위한 함수(프롭스)를 호출
        props.editAction(title, writer, contents);
      }}>
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            {/* value 속성값은 스테이트로 정의한 값을 설정한다. 해당 input에서
            발생되는 이벤트를 통해 입력값을 변경한다. */}
            <td><input type='text' name="writer"
              value={writer}
              onChange={(event)=>{
                // 스테이트 변경을 위한 함수를 호출한다.
                  setWriter(event.target.value)
              }}/>
              </td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type='text' name="title"
              value={title}
              onChange={(event)=>{
                setTitle(event.target.value)
              }}/>
              </td>
          </tr>
          <tr>
            <th>내용</th>
            {/* HTML에서 textarea태그는 태그 사이에 값을 설정하지만, JSX에서는
            input과 동일하게 value 속성을 사용한다. */}
            <td><textarea name="contents" rows='3'
              value={contents}
              onChange={(event)=>{
                setContents(event.target.value)
              }}></textarea>
              </td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="수정하기" />
      </form>
    </article>
  );
}
export default ArticleEdit;