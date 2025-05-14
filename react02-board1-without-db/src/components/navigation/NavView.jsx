
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
        props.onChangeMode('delete');
      }}>삭제</a>&nbsp;
    </nav>
  )
}
export default NavView;