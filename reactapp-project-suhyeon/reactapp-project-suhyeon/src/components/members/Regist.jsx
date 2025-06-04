import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Regist() {
  // 이메일 도메인 선택 관련 상태
  const [isChecked, setIsChecked] = useState(false); // 직접 입력 체크박스 상태
  const [emailDomain, setEmailDomain] = useState(''); // 선택된 도메인 값
  const [isEmailReadonly, setIsEmailReadonly] = useState(false); // 도메인 입력창 읽기 전용 여부

  // 비밀번호와 비밀번호 확인
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 이메일 아이디와 전화번호 입력값 저장용 ref
  const emailIdRef = useRef();
  const phone1Ref = useRef();
  const phone2Ref = useRef();
  const phone3Ref = useRef();

  const navigate = useNavigate();

  // 다음 주소찾기 API 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 쿠키에서 특정 이름의 값을 꺼내는 유틸 함수 (로그인 상태 확인 등에 사용)
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

 
  // 아이디 중복 확인 함수
const handleIdCheck = async () => {
  // 사용자가 입력한 id값을 가져옵니다
  const id = document.getElementById('id').value;

  try {
    // 서버에 아이디 중복 여부 요청
    // axios.get()을 통해 서버에 아이디(id) 파라미터를 포함하여 요청을 보냅니다
    const response = await axios.get(`https://suhyeon.shop/idcheck?id=${id}`);

    // 서버 응답 결과에 따라 안내
    if (response.data.exists) {
      alert('이미 사용 중인 아이디입니다.');
    } else {
      alert('사용 가능한 아이디입니다.');
    }
  } catch (error) {
    alert('중복 확인 중 오류가 발생했습니다.');
  }
};

  // 다음 주소 검색 API 실행
  const handlePostcode = () => {
    new window.daum.Postcode({
      // 사용자가 주소를 선택했을 때 실행되는 콜백 함수
      oncomplete: function (data) {
        // 전체 주소를 addr1 입력창에 자동으로 채운다
        document.getElementById("addr1").value = data.address;

        // 상세 주소 입력칸으로 커서를 자동 이동
        document.getElementById("addr2").focus();
      },
    }).open();
  };

  // 회원가입 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 불일치 시 막기
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 입력값들 수집
    const id = document.getElementById('id').value;
    const email = `${emailIdRef.current.value}@${emailDomain}`;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const phone = `${phone1Ref.current.value}-${phone2Ref.current.value}-${phone3Ref.current.value}`;
    const addr1 = document.getElementById('addr1').value;
    const addr2 = document.getElementById('addr2').value;
    const address = addr1 + ' ' + addr2;

    const user = { id, email, name, password, phone, address };

    try {
      // 서버에 회원정보 전송
      await axios.post('https://suhyeon.shop/join', user);
      alert('회원가입이 완료되었습니다.');
      navigate('/login'); // 회원가입 완료 후 로그인 페이지로 이동
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  // 이메일 도메인 선택 드롭다운 변경 시 처리
  const handleDomainChange = (e) => {
    const domain = e.target.value;
    if (domain === "self") { // 166
      // 사용자가 '직접입력'을 선택한 경우
      setEmailDomain('');  // 입력창 초기화
      setIsEmailReadonly(false); //직접입력 허용 (readOnly 해제)
    } else {
      // 사용자가 naver.com 또는 gmail.com 같은 도메인을 선택한 경우
      setEmailDomain(domain);  // 선택값 자동입력
      setIsEmailReadonly(true);  // 입력창을 읽기 전용으로 변경
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>
          <input type="text" id="id" required />
          <button type="button" onClick={handleIdCheck}>중복확인</button>
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>이름</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label>이메일</label>
          {/* 이메일 아이디 부분 입력 */}
          <input type="text" ref={emailIdRef} required /> @
          {/* 이메일 도메인 부분 입력 (선택 또는 직접입력) */}
          <input
            type="text"
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)} //직접입력일 경우 입력 가능
            readOnly={isEmailReadonly} // 선택된 도메인은 읽기 전용 처리
            required
          />
          {/* 이메일 도메인 선택 드롭다운 */}
          {/* 선택 시 handleDomainChange 함수 호출 */}
          <select onChange={handleDomainChange}>
            <option value="">선택</option>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="self">직접입력</option>
          </select>
        </div>
        <div>
          <label>전화번호</label>
          <input type="text" ref={phone1Ref} size="3" maxLength="3" required /> -
          <input type="text" ref={phone2Ref} size="4" maxLength="4" required /> -
          <input type="text" ref={phone3Ref} size="4" maxLength="4" required />
        </div>
        <div>
          <label>주소</label>
          <input type="text" id="addr1" readOnly />
          <button type="button" onClick={handlePostcode}>주소검색</button>
          <input type="text" id="addr2" placeholder="상세주소 입력" />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Regist;
