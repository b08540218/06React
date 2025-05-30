import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedEmail = getCookie('user_email');

    if (savedEmail === email.trim()) {
      // ✅ 로그인 상태 저장
      sessionStorage.setItem('isAuthenticated', 'true');

      alert('로그인 성공!');
      navigate('/');
    } else {
      alert('로그인 실패: 이메일 정보가 일치하지 않습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <table>
        <tbody>
          <tr>
            <th><label htmlFor="email">이메일</label></th>
            <td>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <th><label htmlFor="password">비밀번호</label></th>
            <td>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="center">
              <button type="submit">로그인</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default Login;
