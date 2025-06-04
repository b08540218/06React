import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const FileList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'filePosts'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(data);
      } catch (err) {
        console.error('자료실 목록 불러오기 오류:', err);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    return isToday
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toISOString().split('T')[0];
  };
  // 로그인 여부 확인을 위한 쿠키 검사 함수
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  };
  // 로그인 상태 여부를 불리언으로 저장
  const isLoggedIn = !!getCookie('user_email');

  // 페이징 계산
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center' }}>자료실</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '10px', textAlign: 'center', width: '60px' }}>번호</th>
            <th style={{ padding: '10px' }}>제목</th>
            <th style={{ padding: '10px' }}>작성자</th>
            <th style={{ padding: '10px' }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', textAlign: 'center', width:'60px' }}>
                {posts.length - (indexOfFirst + index)}</td>
              <td style={{ padding: '10px' }}>
                <Link to={`/fileview/${post.id}`}>{post.title}</Link>
              </td>
              <td style={{ padding: '10px' }}>{post.author}</td>
              <td style={{ padding: '10px' }}>{formatDate(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 버튼 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              margin: '0 5px',
              padding: '6px 12px',
              backgroundColor: page === currentPage ? '#4a90e2' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 글쓰기 버튼 (로그인 사용자만 보임) */}
      {isLoggedIn && (
        <Link to="/filewrite">
          <button
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px', // 원하면 4px이나 12px도 가능
              padding: '10px 16px', // ← 중요: 글자에 맞는 여백
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
            }}
          >
            글쓰기
          </button>
        </Link>
      )}
    </div>
  );
};

export default FileList;
