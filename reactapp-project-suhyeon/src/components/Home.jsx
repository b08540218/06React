const Home = () => {
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const userEmail = getCookie('user_email');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>React 애플리케이션 제작하기</h2>
      {userEmail && <p style={{ fontSize: '18px', fontWeight: 'bold' }}>환영합니다 {userEmail}</p>}
    </div>
  );
};

export default Home;