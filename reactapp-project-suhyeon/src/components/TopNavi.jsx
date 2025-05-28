import { NavLink } from "react-router-dom";

function TopNavi(props) {
  return (<>
    <nav>
      <NavLink to="/">Home</NavLink>&nbsp;
      <NavLink to="/regist">회원가입</NavLink>&nbsp;
      <NavLink to="/login">로그인</NavLink>&nbsp;
      {/* <NavLink to="/Freelist">자유게시판</NavLink>&nbsp; */}
    </nav>
  </>); 
}
export default TopNavi; 