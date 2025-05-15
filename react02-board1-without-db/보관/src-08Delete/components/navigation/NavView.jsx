
function NavView(props){
  return(
    // 엘리먼트 사이를 띄어쓰기 할때는 &nbsp;를 사용하면 된다.
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>&nbsp;

      <a href="/" onClick={function(event){
        event.preventDefault();
        /** HTML에서는 window객체를 생략하지만, JSX에서는 추가하는것이 좋다.*/
        if (window.confirm('삭제할까요?')) {
          // 스테이트로 정의된 mode를 delete로 변경한다.
          props.onChangeMode('delete');
        }
      }}>삭제</a>&nbsp;
    </nav>
  )
}
export default NavView;