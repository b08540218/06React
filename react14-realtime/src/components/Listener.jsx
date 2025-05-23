import { useEffect } from "react";
import { useState } from "react";
import {realtime} from '../realtimeConfig';
import { ref, onValue} from 'firebase/database';
import Navi from '../components/Navi';

function Listener() {
  console.log('aa.realtime',realtime);

  const [fireData, setFireData] =useState([]);

  const dbRef = ref(realtime, 'users');
  useEffect(()=>{
    onValue(dbRef, (snapshot)=>{
      let showTr = [];
      snapshot.forEach((childSnapshot)=>{
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        showTr.push(
          <tr>
            <td>{childKey}</td>
            <td>{childData.name}</td>
            <td>{childData.pass}</td>
            <td>{childData.fireData}</td>
          </tr>
        )
      })
      console.log('bb',showTr);
      setFireData(showTr);
      
    });
  }, []);
  console.log('cc');
  return(
    <div className="App">
      <Navi />
      <h2>Firebase - Realtime Database App</h2>
      <h3>02.Listener</h3>
      <table border={1} className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>아이디</th>
            <th>이름</th>
            <th>패스워드</th>
            <th>고유키</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
export default Listener;