
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import TopNavi from './components/TopNavi';
import Regist from "./components/members/Regist";
import Login from "./components/members/Login";

function App() {

  return (<>
  <TopNavi/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regist" element={<Regist />} />
      <Route path="/login" element={<Login/>}/>
      {/* 자유게시판 */}
      {/* <Route path="/freelist" element={<FreeList/>}/> */}
      {/* FreeList FreeView FreeWrite */}
      {/* QnA게시판 */}
      {/* QnaList QnaView QnaWrite */}
    </Routes>
  </>)
}

export default App
