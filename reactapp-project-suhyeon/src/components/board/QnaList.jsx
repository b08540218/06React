import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const QnaList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'qnaPosts'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(list);
      } catch (err) {
        console.error('Q&A 목록 불러오기 실패:', err);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    const today = new Date().toDateString();
    return date.toDateString() === today
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toISOString().split('T')[0];
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  };

  const isLoggedIn = !!getCookie('user_email');

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Q&A 게시판</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9f9f9' }}>
            <th style={{ padding: '10px' }}>번호</th>
            <th style={{ padding: '10px' }}>제목</th>
            <th style={{ padding: '10px' }}>작성자</th>
            <th style={{ padding: '10px' }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ textAlign: 'center' }}>{posts.length - index}</td>
              <td>
                <Link to={`/qnaview/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.author}</td>
              <td>{formatDate(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 글쓰기 버튼 */}
      {isLoggedIn && (
        <Link to="/qnawrite">
          <button style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
          }}>
            +
          </button>
        </Link>
      )}
    </div>
  );
};

export default QnaList;
