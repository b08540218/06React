import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';

//모듈화 처리한 컴포넌트 임포트 
import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List></List>} />
        <Route path='/list' element={<List></List>} />
        <Route path='/view'element={<View></View>} />
        <Route path='/write' element={<Write></Write>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;

