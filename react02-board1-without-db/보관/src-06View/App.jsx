// 스테이트 사용을 위한 훅 임포트

// 모듈화 한 컴포넌트 임포트
import { useState } from "react";
import NavList from './components/navigation/NavList'
import NavView from './components/navigation/NavView'
import NavWrite from './components/navigation/NavWrite'
import ArticleList from './components/article/ArticleList'
import ArticleView from './components/article/ArticleView'
import ArticleWrite from './components/article/ArticleWrite'


// 페이지가 없을때 임시로 사용하기 위한 컴포넌트
// 헤더 컴포넌트는 모든 페이지에서 공통으로 사용된다.
function ReadComp(){
  return(
    <div>
      <h3>컴포넌트 준비중입니다.</h3>
      <a href='/'>Home바로가기</a>
    </div>
  )
}

function Header(props) {
  console.log('props',props.title);
  return(
    <header>
      <h2>{props.title}</h2>
    </header>
  )
}

function App() {
  // 게시판의 데이터로 사용할 객체형 배열
  const boardData=[
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쎔',date:'2023-01-01',
    contents:'React를 뽀개봅시다.'},
    {no:2, title:'오늘은 Javascript공부해씸', writer:'유겸이',date:'2023-03-03',
    contents:'Javascript는 할개많다'},
    {no:3, title:'오늘은 Project해야지', writer:'개똥이',date:'2023-05-05',
    contents:'Project는 뭘 만들어 볼까.'},
  ];
  /**
  화면 전환을 위한 스테이트 생성. 변수명은 mode, 초깃값은 list,
  변경을 위한 함수는 setMode()로 정의한다.
   */
  const [mode,setMode] = useState('list');

  // 선택한 게시물의 일련번호를 저장. 첫 실행시에 선택한 게시물이 없으므로 null로 초기화
  const [no, setNo] = useState(null);

  // 컴포넌트와 타이틀을 저장할 변수 생성
  // 선택할 게시물의 객체를 저장할 변수 추가 ("{no:1, title:'오늘은')
  let articleComp, navComp,titeVar, selectRow;

  // mode의 값에 따라 각 화면을 전환하기 위해 분기한다.
  if (mode==='list') {
    titeVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    articleComp = <ArticleList boardData={boardData}
    onChangeMode={(no)=>{
      console.log('선택한 게시물번호:'+ no);
      // 화면을 '열람'으로 전환
      setMode('view');
      // 선택한 게시물의 일련번호로 스테이트 변경
      setNo(no);
    }
  }></ArticleList>
  } 
  else if(mode==='view'){
    titeVar = '게시판-읽기(props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>

    console.log("현재no:", no,typeof(no));
    // 선택한 게시물의 일련번호와 일치하는 객체를 검색하기 위한 반복
    for (let i = 0; i < boardData.length; i++) {
      if (no===boardData[i].no) {
        // 일치하는 게시물이 있다면 변수에 저장
        selectRow = boardData[i];
      }
    }
    // 선택한 게시물을 프롭스를 통해 자식 컴포넌트로 전달
    articleComp = <ArticleView selectRow={selectRow}></ArticleView>
  }

  else if (mode==='write') {
    titeVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>

    articleComp = <ArticleView></ArticleView>
  }
  else if (mode==='write') {
    titeVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
    articleComp = <ArticleWrite></ArticleWrite>
  }
  else{
    // mode의 값이 없는 경우 '준비물'을 화면에 표시한다.
    navComp = <ReadComp></ReadComp>
    articleComp ='';
  }
  return (<>
      <div className="App">
        <Header title={titeVar}></Header>
        {/* mode의 변화에 따라 다른 컴포넌트를 렌더링 한다. */}
        {navComp}
        {articleComp}
      </div>
  </>
  )
}

export default App
