import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function TopNavi() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  };

  useEffect(() => {
    const userEmail = getCookie("user_email");
    const isAuth = sessionStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(!!userEmail && isAuth); // 둘 다 만족해야 로그인 상태로 간주
  }, [location]);

  const handleLogout = () => {
    document.cookie = "user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    sessionStorage.removeItem("isAuthenticated"); // 세션도 삭제
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="top-nav">
      <div>
        <NavLink to="/">Home</NavLink>&nbsp;
        <NavLink to="/freelist">자유게시판</NavLink>&nbsp;
        <NavLink to="/qnalist">QnA</NavLink>&nbsp;
        <NavLink to="/regist">회원가입</NavLink>&nbsp;
        {!isLoggedIn && <NavLink to="/login">로그인</NavLink>}
      </div>
      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      )}
    </nav>
  );
}

export default TopNavi;
