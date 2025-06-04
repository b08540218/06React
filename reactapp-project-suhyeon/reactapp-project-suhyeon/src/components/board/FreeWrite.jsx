import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const FreeWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = getCookie('user_email');

    if (!userEmail) {
      alert('로그인 후 작성할 수 있습니다.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await addDoc(collection(db, 'freePosts'), {
        title,
        content,
        author: userEmail,
        createdAt: serverTimestamp(),
      });
      alert('게시글이 등록되었습니다.');
      navigate('/freelist');
    } catch (err) {
      console.error('글 작성 오류:', err);
      alert('작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>자유게시판 글쓰기</h2>
      <table>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                style={{ width: '100%' }}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="center">
              <button type="submit">등록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default FreeWrite;
