import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const FreeEdit = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'freePosts', postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setContent(data.content);
        } else {
          alert('게시글을 찾을 수 없습니다.');
          navigate('/freelist');
        }
      } catch (err) {
        console.error('게시글 로드 오류:', err);
        alert('오류가 발생했습니다.');
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      const docRef = doc(db, 'freePosts', postId);
      await updateDoc(docRef, {
        title,
        content,
        updatedAt: serverTimestamp()
      });
      alert('수정이 완료되었습니다.');
      navigate(`/freeview/${postId}`);
    } catch (err) {
      console.error('수정 오류:', err);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>게시글 수정</h2>
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
              <button type="submit">수정 완료</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default FreeEdit;
