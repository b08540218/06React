const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // 모든 origin 허용. 배포 시 수정 가능

admin.initializeApp();
const db = admin.firestore();

// 아이디 중복 확인 API
exports.checkId = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const username = req.query.username;

    if (!username) {
      return res.status(400).json({ message: '아이디를 입력해주세요.' });
    }

    try {
      const snapshot = await db
        .collection('users') // users 컬렉션에서
        .where('username', '==', username)
        .get();

      const available = snapshot.empty; // 결과가 없으면 사용 가능
      res.status(200).json({ available });
    } catch (error) {
      console.error('Error checking ID:', error);
      res.status(500).json({ message: '서버 오류' });
    }
  });
});
