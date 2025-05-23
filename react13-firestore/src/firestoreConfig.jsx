
// 파이어베이스 서비스에 연결하기 위한 임포트
import { initializeApp } from "firebase/app";
// 파이어스토어 데이터베이스 사용을 위한 임포트
import { getFirestore } from "firebase/firestore";

// .env 생성전
// 파이어베이스 콘솔에서 발급받은 API정보(SDK정보)
// const firebaseConfig = {
  // apiKey: "AIzaSyDIgYKlkT9R-_z3hvVDsy49PKgGmoIE6qQ",
  // authDomain: "myreactapp-41248.firebaseapp.com",
  // projectId: "myreactapp-41248",
  // storageBucket: "myreactapp-41248.firebasestorage.app",
  // messagingSenderId: "148610703457",
  // appId: "1:148610703457:web:b5d0508e092a9fb2d9ca20",
  // measurementId: "G-G6BWKED451"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
};

// firebase에 연결 후 앱 초기화
const app = initializeApp(firebaseConfig);
// firestore 사용을 위한 객체 생성
const firestore = getFirestore(app);
// 익스포트(내보내기)
export {firestore};