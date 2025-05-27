import React, { useState } from 'react';

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

const CommentBtn = () => {
  return (
    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
      댓글 작성
    </button>
  );
};

function ModalWindow({ onSubmit }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    onSubmit({ author, content, timestamp: now });

    setAuthor('');
    setContent('');
  };

  return (
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="commentAuthor" className="form-label">작성자명</label>
              <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요"
                value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <label htmlFor="commentContent" className="form-label">댓글 내용</label>
            <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"
              value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>작성</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentList({ comment, likeCount, onLike }) {
  if (!comment) return null;

  return (
    <ul className="list-group mt-3">
      <li className="list-group-item">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <strong>{comment.author}</strong> <small className="ms-2">{comment.timestamp}</small>
          </div>
          <div>
            <button className="btn btn-outline-success btn-sm"
              onClick={onLike}>좋아요 ({likeCount})</button>
            <button className="btn btn-outline-warning btn-sm">수정</button>
            <button className="btn btn-outline-danger btn-sm">삭제</button>
          </div>
        </div>
        <p className="mt-2 mb-0" style={{ whiteSpace: 'pre-wrap' }}>
          {comment.content}
        </p>
      </li>
    </ul>
  );
}

const App = () => {
  const [comment, setComment] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  const handleSubmit = (newComment) => {
    setComment(newComment);
    setLikeCount(0); // 댓글 새로 작성되면 좋아요 수 초기화
  };

  const handleLike = () => {
    setLikeCount(prev => prev + 1);
  };

  return (
    <div className="container mt-4">
      <BoardView />
      <CommentBtn />
      <ModalWindow onSubmit={handleSubmit} />
      <CommentList comment={comment} likeCount={likeCount} onLike={handleLike} />
    </div>
  );
};

export default App;
