import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const QnaWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = getCookie('user_email');
    if (!userEmail) {
      alert('로그인 후 작성 가능합니다.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await addDoc(collection(db, 'qnaPosts'), {
        title,
        content,
        author: userEmail,
        createdAt: serverTimestamp(),
      });

      alert('질문이 등록되었습니다.');
      navigate('/qnalist');
    } catch (error) {
      console.error('질문 등록 오류:', error);
      alert('질문 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Q&A 질문 작성</h2>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <th style={{ textAlign: 'left' }}>제목</th>
            <td>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left' }}>내용</th>
            <td>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                required
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'center' }}>
              <button type="submit">등록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default QnaWrite;
