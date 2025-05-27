import React, { useState, useEffect } from 'react';

/* 게시글 정보 출력 (제목과 설명) */
function BoardView() {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">댓글 작성 구현하기</h5>
        <p className="card-text">
          구현할 기능은 댓글작성, 좋아요, 수정, 삭제입니다. <br />
          기능 구현은 아래 댓글 작성부터 하면 됩니다.
        </p>
      </div>
    </div>
  );
}

/* 댓글 작성 버튼 컴포넌트 */
const CommentBtn = ({ onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      댓글 작성
    </button>
  );
};

/* 댓글 작성 및 수정 모달 창 */
function ModalWindow({ onSubmit, isEdit, editData }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  /* 수정 모드일 경우 기존 데이터를 입력 필드에 자동 세팅 */
  useEffect(() => {
    if (isEdit && editData) {
      setAuthor(editData.author);
      setContent(editData.content);
    } else {
      setAuthor('');
      setContent('');
    }
  }, [isEdit, editData]);

  // 댓글 제출 (작성 또는 수정)
  const handleSubmit = () => {
    const timestamp = isEdit && editData
      ? editData.timestamp // 수정이면 기존 시간 유지
      : new Date().toISOString().slice(0, 16).replace('T', ' '); // 아니면 현재 시간 생성

    onSubmit({ author, content, timestamp });// 상위 컴포넌트(App)로 전달

    setAuthor('');
    setContent('');

    // 모달 닫기
    const modal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
    modal.hide();
  };

  return (
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">{isEdit ? '댓글 수정' : '댓글 작성'}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="commentAuthor" className="form-label">작성자명</label>
              <input type="text" className="form-control" id="commentAuthor"
                value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <label htmlFor="commentContent" className="form-label">댓글 내용</label>
            <textarea className="form-control" id="commentContent" rows="3"
              value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              {isEdit ? '수정 완료' : '작성'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 댓글 출력 컴포넌트 */
function CommentList({ comment, likeCount, onLike, onEdit }) {
  if (!comment) return null; // 댓글이 없으면 표시하지 않음

  return (
    <ul className="list-group mt-3">
      <li className="list-group-item">
        <div className="d-flex justify-content-between">
          {/* 작성자 + 시간 */}
          <div className="d-flex align-items-center">
            <strong>{comment.author}</strong>
            <small className="ms-2">{comment.timestamp}</small>
          </div>
          {/* 기능 버튼: 좋아요, 수정, 삭제 */}
          <div>
            <button className="btn btn-outline-success btn-sm" onClick={onLike}>좋아요 ({likeCount})</button>
            <button className="btn btn-outline-warning btn-sm" onClick={onEdit}>수정</button>
            <button className="btn btn-outline-danger btn-sm">삭제</button>
          </div>
        </div>
        {/* 댓글 내용 */}
        <p className="mt-2 mb-0" style={{ whiteSpace: 'pre-wrap' }}>
          {comment.content}
        </p>
      </li>
    </ul>
  );
}
/* 전체 앱 컴포넌트 */
const App = () => {
  const [comment, setComment] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  // 댓글 작성 버튼 클릭 시 모달 열기 (초기화)  
  const openModal = () => {
    setIsEdit(false);
    setEditData(null);
    const modal = new bootstrap.Modal(document.getElementById('commentModal'));
    modal.show();
  };
  // 작성 또는 수정 완료 시 실행
  const handleSubmit = (data) => {
    setComment(data);
    setLikeCount(0); // 초기화
    setIsEdit(false);
  };
  // 좋아요 수 증가
  const handleLike = () => {
    setLikeCount(prev => prev + 1);
  };
  // 수정 버튼 클릭 시 실행 (기존 댓글 내용을 모달에 전달)
  const handleEdit = () => {
    setIsEdit(true);
    setEditData(comment);
    const modal = new bootstrap.Modal(document.getElementById('commentModal'));
    modal.show();
  };

  return (
    <div className="container mt-4">
      <BoardView />
      <CommentBtn onClick={openModal} />
      <ModalWindow onSubmit={handleSubmit} isEdit={isEdit} editData={editData} />
      <CommentList
        comment={comment}
        likeCount={likeCount}
        onLike={handleLike}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default App;
