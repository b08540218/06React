import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TopNavi() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/(^| )user_email=([^;]+)/);
    setIsLoggedIn(!!match);
  }, []);

  const handleLogout = () => {
    document.cookie = 'user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px 20px',
      borderBottom: '1px solid #ccc'
    }}>
      <div>
        <NavLink to="/">Home</NavLink>&nbsp;
        <NavLink to="/regist">회원가입</NavLink>&nbsp;
        {!isLoggedIn && <NavLink to="/login">로그인</NavLink>}
      </div>
      {isLoggedIn && (
        <button 
          onClick={handleLogout} 
          style={{ 
            backgroundColor: '#f44336', 
            color: 'white', 
            border: 'none', 
            padding: '6px 12px', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          로그아웃
        </button>
      )}
    </nav>
  );
}

export default TopNavi;
