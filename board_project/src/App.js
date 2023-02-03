/*eslint-disable*/


import logo from './logo.svg';
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom'
import { useState } from 'react';
import Detail from './pages/Detail.js'
import axios from 'axios';

function App() {
  let post = '강남 우동 맛집';
  let [글제목, 글제목변경함수] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']);
  let [좋아요, 좋아요변경함수] = useState(0);
  let [modal, setModal] = useState(0);
  let [like, setLike] = useState([0, 0, 0]);
  let [input1, setInput] = useState('');

  // let color = ['lightorange', 'skyblue', 'lightgreen'];
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      
      {
        글제목.map((v, i) => {
          return (
            // <Modal 글제목 = {글제목} 글제목변경함수 = {글제목변경함수} ></Modal>
            <Modal modal = {modal} 글제목 = {글제목} 글제목변경함수 = {글제목변경함수} i = {i} key = {i}></Modal>

          )

        })
      }

      
    <input onChange = {(e) => {setInput(e.target.value)}}/>
    <button onClick = {() => {
      let copy = [...글제목];
      copy.unshift(input1);
      글제목변경함수(copy);
    }}>글발행</button>

<button onClick = {() => {
      let copy = [...글제목];
      copy.shift();
      글제목변경함수(copy);
    }}>글삭제</button>


<button onClick = {() => {
  axios.get('https://codingapple1.github.io/shop/data2.json')
  .then((res) => {console.log(res.data)})
  .catch(() => {console.log('실패햇누 ㅋㅋㄹㅃㅃ')})
}}>겟요청</button>
    



      
      
      
      
      <Routes>
        <Route path="/about" element={ <About/> } >  
          <Route path="member" element={ <div>멤버들</div> } />
          <Route path="location" element={ <div>회사위치</div> } />
          <Route path="detail/:id" element={ <Detail/> } />
        </Route>

        <Route path = "*" element = {<div> 404 Not Found</div>}></Route>
      </Routes>
    </div>
  );
}

function About() {
  return (
      <div className = "about">
          <Outlet></Outlet>
          <h4>about 페이지 모듈화시킴 ㅅㄱ.</h4>
      </div>
  )
}

function Modal(props){
  return (
    <div className="modal">
      <h4>{ props.글제목[props.i] }</h4>

      <p>날짜</p>
      <p>상세내용</p>
      <button onClick = {() => {}}>모달창</button>
    </div>
  )
}

export default App;



