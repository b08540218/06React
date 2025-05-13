
function FrontComp(props) {
  const liRows = [];
  for(let i=0; i<props.propData1.length; i++){
    liRows.push(
      <li key={i}>{props.propData1[i]}</li>
    );
  }
  return (<> 
    <li>프론트엔드-{props.aTemp}</li>
    <ul>
      {liRows}
    </ul>
    </>)
}
  const BackComp = ({propData2,bTemp}) =>{
    const liRows = [];

    let keyCnt=0;
    for(let row of propData2){
      liRows.push(
    <li key={keyCnt++}>{row}</li>
    );
  }
  return(<>
  <li>백엔드-{bTemp}</li>
  <ul>
    {liRows}
  </ul>
  </>)
}

function App() {
const frontData = ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'React추가'];
const backData = ['Java', 'Oracle', 'JSP', 'Spring Boot', 'Nextjs추가'];

  return(<>
    <div>
      <h2>React - Props</h2>
      <ol>
        <FrontComp propData1={frontData} aTemp={100}></FrontComp>
        <BackComp propData2={backData} bTemp={100}></BackComp>
      </ol>
    </div>
  </>)
}

export default App
