import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function TopNavi() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  };

  useEffect(() => {
    const email = getCookie("user_email");
    const isAuth = sessionStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(!!email && isAuth);
    setUserEmail(isAuth ? email : null);
  }, [location]);

  const handleLogout = () => {
    document.cookie = "user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    sessionStorage.removeItem("isAuthenticated");
    setIsLoggedIn(false);
    setUserEmail(null);
    navigate('/');
  };

  return (
    <nav className="top-nav">
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/freelist">자유게시판</NavLink>
        <NavLink to="/filelist">자료실 게시판</NavLink>
        <NavLink to="/qnalist">QnA</NavLink>
        <NavLink to="/regist">회원가입</NavLink>
        {!isLoggedIn && <NavLink to="/login">로그인</NavLink>}
      </div>

      {isLoggedIn && (
        <div className="welcome-box">
          <span>환영합니다 {userEmail}</span>
          <button className="logout-btn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </nav>
  );
}

export default TopNavi;
