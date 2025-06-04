import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>React 애플리케이션 제작하기</h2>
    </div>
  );
};

export default Home;
