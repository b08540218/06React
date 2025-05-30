import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp, } from 'firebase/firestore';

const QnaView = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const userEmail = getCookie('user_email');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'qnaPosts', postId);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          setPost({ id: postSnap.id, ...postSnap.data() });
        } else {
          alert('게시글을 찾을 수 없습니다.');
          navigate('/qnalist');
        }
      } catch (err) {
        console.error('게시글 로드 실패:', err);
      }
    };

    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, 'qnaPosts', postId, 'comments'),
          orderBy('createdAt', 'asc')
        );
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(list);
      } catch (err) {
        console.error('댓글 로드 실패:', err);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      alert('로그인 후 댓글 작성이 가능합니다.');
      return;
    }
    if (!commentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await addDoc(collection(db, 'qnaPosts', postId, 'comments'), {
        content: commentContent,
        author: userEmail,
        createdAt: serverTimestamp(),
      });
      setCommentContent('');
      const snapshot = await getDocs(
        query(collection(db, 'qnaPosts', postId, 'comments'), orderBy('createdAt', 'asc'))
      );
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error('댓글 등록 오류:', err);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const d = timestamp.toDate();
    return `${d.toISOString().split('T')[0]} ${d.toTimeString().slice(0, 5)}`;
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Q&A 질문 상세</h2>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>{post.title}</h3>
        <p><strong>작성자:</strong> {post.author} | <strong>작성일:</strong> {formatDate(post.createdAt)}</p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/qnalist">
            <button>목록으로</button>
          </Link>
        </div>
      </div>

      {/* 댓글 */}
      <div style={{ marginTop: '40px' }}>
        <h4>댓글</h4>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {comments.map((c) => (
            <li key={c.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              <div><strong>{c.author}</strong> | {formatDate(c.createdAt)}</div>
              <div style={{ whiteSpace: 'pre-wrap' }}>{c.content}</div>

              {/* 수정/삭제 링크 추가 */}
              {userEmail === c.author && (
                <div style={{ marginTop: '5px' }}>
                  <Link to={`/qnaedit/${postId}/${c.id}`}>
                    <button>수정/삭제</button>
                  </Link>
                </div>
              )}
              {/* 댓글 수정/삭제 버튼은 모달 구현 시 여기에 추가 */}
            </li>
          ))}
        </ul>

        {/* 댓글 입력 */}
        <form onSubmit={handleCommentSubmit} style={{ marginTop: '20px' }}>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '8px' }}
            placeholder="댓글을 입력하세요..."
          />
          <button type="submit" style={{ marginTop: '10px' }}>댓글 등록</button>
        </form>
      </div>
    </div>
  );
};

export default QnaView;
