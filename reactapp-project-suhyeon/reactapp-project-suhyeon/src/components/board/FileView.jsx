import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';

const FileView = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'filePosts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          console.log("게시글 데이터:", data);
          setPost(data);
        } else {
          console.log("게시글 없음");
        }
      } catch (err) {
        console.error('게시글 불러오기 실패:', err);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post?.file?.downloadURL) {
      console.log("이미지/파일 URL:", post.file.downloadURL);
    }
  }, [post]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, 'filePosts', id));
        navigate('/filelist');
      } catch (err) {
        console.error('삭제 실패:', err);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  };

  const userEmail = getCookie('user_email');

  if (!post) return <div style={{ textAlign: 'center', marginTop: '50px' }}>게시글을 불러오는 중...</div>;

  const { title, content, author, createdAt, file } = post;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h2>{title}</h2>
      <p><strong>작성자:</strong> {author}</p>
      <p><strong>작성일:</strong> {formatDate(createdAt)}</p>
      <hr />
      <p>{content}</p>

      {file && (
        <div style={{ marginTop: '20px' }}>
          <strong>첨부파일</strong>{' '}
          {file.contentType?.startsWith('image/') ? (
            <div>
              <img
                src={file.downloadURL}
                alt={file.name}
                style={{ maxWidth: '100%', maxHeight: '400px', border: '1px solid #ccc', marginTop: '10px' }}
              />
            </div>
          ) : (
            <a href={file.downloadURL} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          )}
        </div>
      )}

      {/* 삭제 버튼 (작성자만 보임) */}
      {userEmail === author && (
        <div style={{ marginTop: '30px' }}>
          {/* <button
            onClick={() => navigate(`/fileedit/${id}`)}
            style={{ marginRight: '10px' }}
          >
            수정
          </button> */}
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default FileView;
