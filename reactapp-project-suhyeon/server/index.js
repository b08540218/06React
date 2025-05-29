// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:  true
}));
app.use(express.json());

// 테스트용 아이디 목록 (DB 대신)
const users = ['testuser', 'admin', 'guest'];

// 아이디 중복확인 API
app.get('/users/check-id', (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: '아이디를 입력해주세요.' });
  }

  const isAvailable = !users.includes(username.toLowerCase());
  res.json({ available: isAvailable });
});

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});