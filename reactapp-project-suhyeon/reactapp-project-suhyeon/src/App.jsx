
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import TopNavi from './components/TopNavi';
import Regist from "./components/members/Regist";
import Login from "./components/members/Login";
import FreeList from "./components/board/FreeList";
import FreeWrite from "./components/board/FreeWrite";
import FreeView from "./components/board/FreeView";
import FreeEdit from "./components/board/FreeEdit";
import QnaWrite from "./components/board/QnaWrite";
import QnaList from "./components/board/QnaList";
import QnaView from "./components/board/QnaView";
import QnaEdit from "./components/board/QnaEdit";
import FileList from "./components/board/FileList";
import FileWrite from "./components/board/FileWrite";
import FileView from "./components/board/FileView";


function App() {

  return (<>
    <TopNavi />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regist" element={<Regist />} />
      <Route path="/login" element={<Login />} />
      {/* 자유게시판 */}
      <Route path="/freelist" element={<FreeList />} />
      <Route path="/freewrite" element={<FreeWrite />} />
      <Route path="/freeview/:postId" element={<FreeView />} />
      <Route path="/freeedit/:postId" element={<FreeEdit />} />
      {/* QnA게시판 */}
      <Route path="/qnalist" element={<QnaList />} />
      <Route path="/qnawrite" element={<QnaWrite />} />
      <Route path="/qnaview/:postId" element={<QnaView />} />
      <Route path="/qnaedit/:postId/:commentId" element={<QnaEdit />} />
      {/* 자료실 게시판 */}
      <Route path="/filelist" element={<FileList/>}/>
      <Route path="/filewrite" element={<FileWrite/>}/>
      <Route path="/fileview/:id" element={<FileView/>}/>
    </Routes>
  </>)
}

export default App
