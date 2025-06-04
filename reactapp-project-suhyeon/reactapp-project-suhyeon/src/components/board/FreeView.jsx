import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const FreeView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'freePosts', postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert('게시글을 찾을 수 없습니다.');
          navigate('/freelist');
        }
      } catch (err) {
        console.error('게시글 조회 오류:', err);
        alert('게시글을 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const handleDelete = async () => {
    if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, 'freePosts', postId));
        alert('삭제되었습니다.');
        navigate('/freelist');
      } catch (err) {
        console.error('삭제 오류:', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    return `${date.toISOString().split('T')[0]} ${date.toTimeString().slice(0, 5)}`;
  };

  if (!post) return <div>로딩 중...</div>;
  // 추가: 사용자 이메일 가져오기 및 비교
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  };

  const userEmail = getCookie('user_email');
  const isAuthor = post && userEmail === post.author;

  return (
     <div className="post-view-wrapper">
    <h2 className="post-title">게시글 상세보기</h2>

  <div className="post-row">
      <span className="post-label">제목:</span>
      <span>{post.title}</span>
    </div>
<hr />

     <div className="post-row">
      <span className="post-label">작성자:</span>
      <span>{post.author}</span>
      {/* <span className="post-label" style={{ marginLeft: '30px' }}>작성일:</span> */}
      <span className="post-label" style={{ marginLeft: '50px' }}>/</span>
      <span>{formatDateTime(post.createdAt)}</span>
    </div>
    <hr />
    <div className="post-row" style={{ flexDirection: 'column' }}>
      <span className="post-label">내용</span>
      <div className="post-content">{post.content}</div>
    </div>

    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <Link to="/freelist">
        <button>목록으로</button>
      </Link>&nbsp;

      {isAuthor && (
        <>
          <Link to={`/freeedit/${post.id}`}>
            <button>수정</button>
          </Link>&nbsp;
          <button onClick={handleDelete}>삭제</button>
          
        </>
      )}
    </div>
  </div>
  );
};

export default FreeView;
