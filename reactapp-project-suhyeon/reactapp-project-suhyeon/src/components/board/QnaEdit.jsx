import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const QnaEdit = () => {
  const { postId, commentId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const userEmail = getCookie('user_email');

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const ref = doc(db, 'qnaPosts', postId, 'comments', commentId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setContent(data.content);
          setAuthor(data.author);
          if (data.author !== userEmail) {
            alert('본인만 수정할 수 있습니다.');
            navigate(`/qnaview/${postId}`);
          }
        } else {
          alert('댓글을 찾을 수 없습니다.');
          navigate(`/qnaview/${postId}`);
        }
      } catch (err) {
        console.error('댓글 로딩 오류:', err);
        navigate(`/qnaview/${postId}`);
      }
    };
    fetchComment();
  }, [postId, commentId, navigate, userEmail]);

  const handleUpdate = async () => {
    try {
      const ref = doc(db, 'qnaPosts', postId, 'comments', commentId);
      await updateDoc(ref, { content });
      alert('댓글이 수정되었습니다.');
      navigate(`/qnaview/${postId}`);
    } catch (err) {
      console.error('수정 오류:', err);
      alert('수정 실패');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const ref = doc(db, 'qnaPosts', postId, 'comments', commentId);
        await deleteDoc(ref);
        alert('댓글이 삭제되었습니다.');
        navigate(`/qnaview/${postId}`);
      } catch (err) {
        console.error('삭제 오류:', err);
        alert('삭제 실패');
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center' }}>댓글 수정</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="6"
        style={{ width: '100%', padding: '10px' }}
      />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleUpdate} style={{ marginRight: '10px' }}>수정</button>
        <button onClick={handleDelete} style={{ marginRight: '10px' }}>삭제</button>
        <button onClick={() => navigate(`/qnaview/${postId}`)}>취소</button>
      </div>
    </div>
  );
};

export default QnaEdit;
