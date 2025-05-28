import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Regist() {
  const [isChecked, setIsChecked] = useState(false);
  const [emailDomain, setEmailDomain] = useState('');
  const [isEmailReadonly, setIsEmailReadonly] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const emailIdRef = useRef();
  const phone1Ref = useRef();
  const phone2Ref = useRef();
  const phone3Ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const handleIdCheck = async () => {
    const username = document.getElementById('username').value.trim();
    if (!username) {
      alert('아이디를 입력해주세요.');
      return;
    }

    const savedEmail = getCookie('user_email');
    if (savedEmail && savedEmail.startsWith(username + '@')) {
      alert('이미 사용 중인 아이디입니다.');
      setIsChecked(false);
      return;
    }

    try {
      const res = await axios.get(`/api/users/check-id?username=${encodeURIComponent(username)}`);
      console.log('서버 응답:', res);

      const available = res.data?.available;

      if (res.status === 200 && typeof available === 'boolean') {
        if (available) {
          alert('사용 가능한 아이디입니다.');
          setIsChecked(true);
        } else {
          alert('이미 사용 중인 아이디입니다.');
          setIsChecked(false);
        }
      } else {
        console.warn('서버 응답 포맷 확인 필요:', res.data);
        alert('서버 응답이 올바르지 않습니다.');
        setIsChecked(false);
      }
    } catch (error) {
      console.error('중복확인 오류:', error);
      alert('중복확인 중 오류가 발생했습니다.');
      setIsChecked(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert('아이디 중복확인을 해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const email = `${emailIdRef.current.value}@${emailDomain}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }

    // 쿠키에 사용자 이메일 저장
    document.cookie = `user_email=${email}; path=/; max-age=86400`;
    alert('회원가입이 완료되었습니다!');
    navigate('/login');
  };

  const handlePhoneInput = (e, len, nextRef) => {
    if (e.target.value.length >= len && nextRef.current) nextRef.current.focus();
  };

  const handleEmailDomainChange = (e) => {
    const value = e.target.value;
    setEmailDomain(value);
    setIsEmailReadonly(value !== '');
  };

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        document.getElementById('zipcode').value = data.zonecode;
        document.getElementById('address1').value = data.roadAddress;
        document.getElementById('address2').focus();
      },
    }).open();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <table>
        <tbody>
          <tr>
            <th><label htmlFor="username">아이디</label></th>
            <td>
              <input type="text" id="username" name="username" required />
              <button type="button" className="inline-button" onClick={handleIdCheck}>중복확인</button>
            </td>
          </tr>
          <tr>
            <th><label htmlFor="password">패스워드</label></th>
            <td>
              <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th><label htmlFor="confirmPassword">패스워드 확인</label></th>
            <td>
              <input type="password" id="confirmPassword" name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th><label htmlFor="name">이름</label></th>
            <td><input type="text" id="name" name="name" required /></td>
          </tr>
          <tr>
            <th><label>이메일</label></th>
            <td className="email-group">
              <input type="text" name="emailId" placeholder="아이디" required ref={emailIdRef} /> @
              <input
                type="text"
                name="emailDomain"
                placeholder="도메인"
                required
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
                readOnly={isEmailReadonly}
              />
              <select name="emailSelect" onChange={handleEmailDomainChange}>
                <option value="">선택</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="">직접입력</option>
              </select>
            </td>
          </tr>
          <tr>
            <th><label>휴대전화번호</label></th>
            <td>
              <div className="phone-group">
                <input type="text" name="phone1" maxLength="3" required ref={phone1Ref} onChange={(e) => handlePhoneInput(e, 3, phone2Ref)} /> -
                <input type="text" name="phone2" maxLength="4" required ref={phone2Ref} onChange={(e) => handlePhoneInput(e, 4, phone3Ref)} /> -
                <input type="text" name="phone3" maxLength="4" required ref={phone3Ref} />
              </div>
            </td>
          </tr>
          <tr>
            <th><label htmlFor="zipcode">우편번호</label></th>
            <td>
              <input type="text" id="zipcode" name="zipcode" required />
              <button type="button" className="inline-button" onClick={handlePostcode}>우편번호찾기</button>
            </td>
          </tr>
          <tr>
            <th><label htmlFor="address1">기본주소</label></th>
            <td><input type="text" id="address1" name="address1" required className="full-width" /></td>
          </tr>
          <tr>
            <th><label htmlFor="address2">상세주소</label></th>
            <td><input type="text" id="address2" name="address2" className="full-width" /></td>
          </tr>
          <tr>
            <td colSpan="2" className="center">
              <button type="submit">회원가입</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default Regist;
