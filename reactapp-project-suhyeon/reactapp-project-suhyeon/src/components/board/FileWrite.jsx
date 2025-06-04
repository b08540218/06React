import { useState } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const FileWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
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
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      let fileData = null;

      if (file) {
        const storageRef = ref(storage, `fileUploads/${Date.now()}_${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadResult.ref);

        console.log("업로드된 파일 URL:", downloadURL);

        fileData = {
          name: file.name,
          contentType: file.type,
          downloadURL
        };
      }

      await addDoc(collection(db, 'filePosts'), {
        title,
        content,
        author: userEmail,
        createdAt: serverTimestamp(),
        file: fileData
      });

      alert('게시글이 등록되었습니다.');
      navigate('/filelist');
    } catch (err) {
      console.error('게시글 업로드 실패:', err);
      alert('게시글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center' }}>자료실 글쓰기</h2>
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
                rows="8"
                required
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left' }}>첨부파일</th>
            <td>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="*/*"
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

export default FileWrite;
