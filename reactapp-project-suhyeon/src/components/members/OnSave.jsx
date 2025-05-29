import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function OnSave({ email, authResult, originallEmail, setModal }) {
  const navigate = useNavigate();

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const userEmail = getCookie('user_email');
  const userId = userEmail?.split('@')[0];

  const [emailInput, setEmail] = useState(email || userEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (userId) {
      axios.get(`${import.meta.env.VITE_API_USER}/getUser?id=${userId}`)
        .then(res => {
          if (res.data && res.data.name) {
            setName(res.data.name);
          }
        })
        .catch(err => {
          console.error('사용자 이름 불러오기 실패:', err);
        });
    }
  }, [userId]);

  if (!userEmail) {
    return (
      <div>
        <p>로그인이 필요한 기능입니다.</p>
        <a href="/login">로그인하러 가기</a>
      </div>
    );
  }

  const onSave = () => {
    if (!userId) {
      alert('로그인된 사용자 정보가 없습니다.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const user = {
      id: userId,
      email: authResult ? emailInput : originallEmail,
      password: password,
      name: name,
      image: '변동없음',
    };

    axios
      .post(`${import.meta.env.VITE_API_USER}/userUpdate`, user, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          document.cookie = `user_email=${emailInput}; path=/; max-age=86400`;
          document.cookie = `user_id=${userId}; path=/; max-age=86400`;
          document.cookie = `user_name=${name}; path=/; max-age=86400`;

          setModal('회원 정보를 변경하였습니다. 2초 뒤 메인페이지로 이동합니다.');
          setTimeout(() => {
            navigate('/');
            location.reload();
          }, 2000);
        } else {
          alert('회원 정보 변경에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('회원정보 수정 오류:', error);
        alert('서버와 통신 중 오류가 발생했습니다.');
      });
  };

  return (
    <form>
      <h2>회원정보 수정</h2>
      <label>
        아이디
        <input type="text" value={userId || ''} readOnly />
      </label>
      <br />
      <label>
        이메일
        <input type="text" value={emailInput} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        비밀번호
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        비밀번호 확인
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <br />
      <label>
        이름
        <input type="text" value={name} readOnly />
      </label>
      <br />
      <button type="button" onClick={onSave}>저장</button>
    </form>
  );
}

export default OnSave;
