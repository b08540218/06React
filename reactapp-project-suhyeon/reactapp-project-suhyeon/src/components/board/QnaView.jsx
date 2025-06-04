import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { getDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp, } from 'firebase/firestore';

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
    // Firestore에서 해당 게시글의 댓글 목록을 가져오는 함수
    const fetchComments = async () => {
      try {
         // 'qnaPosts/{postId}/comments' 컬렉션에서 작성일 기준으로 정렬된 쿼리 생성
        const q = query(
          collection(db, 'qnaPosts', postId, 'comments'),
          orderBy('createdAt', 'asc')
        );
        // 쿼리 실행 ->snapshot으로 받아옴
        const snapshot = await getDocs(q);

        // 문서 데이터를 배열로 변환하여 상태로 저장
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(list); // 화면에 댓글 목록 렌더링
      } catch (err) {
        console.error('댓글 로드 실패:', err);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  // 댓글 입력 폼 제출 처리 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // 로그인 여부 체크
    if (!userEmail) {
      alert('로그인 후 댓글 작성이 가능합니다.');
      return;
    }
    // 내용이 비어있는지 체크
    if (!commentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      // Firestore에 댓글 추가 (qnaPosts/{postId}/comments)
      await addDoc(collection(db, 'qnaPosts', postId, 'comments'), {
        content: commentContent, // 댓글 내용
        author: userEmail,       // 작성자 이메일
        createdAt: serverTimestamp(),  // 서버 기준 작성 시각
      });

      // 입력창 초기화
      setCommentContent('');

      // 댓글 목록 새로 불러와 상태 업데이트
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

  const handleDelete = async () => {
    if (window.confirm('정말 이 질문을 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, 'qnaPosts', postId));
        alert('질문이 삭제되었습니다.');
        navigate('/qnalist');
      } catch (error) {
        console.error('질문 삭제 오류:', error);
        alert('질문 삭제 중 오류가 발생했습니다.');
      }
    }
  };

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
          {userEmail === post.author && (
            <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
              질문 삭제
            </button>
          )} 
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
