
function NavList(props){
  return(
    <nav>
      <a href="/" onClick={function(event){
        // a태그는 화면의 깜빡거림이 있으므로 이벤트를 차단
        event.preventDefault();
        // 부모에서 전달된 함수를 호출
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  )
}
export default NavList;