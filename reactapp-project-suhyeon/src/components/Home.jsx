import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [userEmail, setUserEmail] = useState(null);
  const location = useLocation();

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  useEffect(() => {
    const email = getCookie('user_email');
    const isAuth = sessionStorage.getItem('isAuthenticated') === 'true';

    // ✅ 로그인된 사용자만 표시
    if (email && isAuth) {
      setUserEmail(email);
    } else {
      setUserEmail(null);
    }
  }, [location]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>React 애플리케이션 제작하기</h2>
      {userEmail && (
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
          환영합니다 {userEmail}
        </p>
      )}
    </div>
  );
};

export default Home;
