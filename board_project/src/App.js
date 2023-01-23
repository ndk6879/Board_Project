/*eslint-disable*/


import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';


function App() {
  let post = '강남 우동 맛집';
  let [글제목, 글제목변경함수] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']);
  let [좋아요, 좋아요변경함수] = useState(0);
  let [modal, setModal] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      <div className="list">
        <h4> { 글제목[0] } <span onClick = {() => {좋아요변경함수(좋아요 + 1)}}>👍</span> {좋아요} </h4>
        <p>2월 17일 발행</p>
        <button onClick = {() => {
          let copy = [...글제목];
          copy[0] = '여자코트 추천';
          글제목변경함수(copy)
          }}>변경</button>

          <button onClick = {() => {
            let copy = [...글제목];
            글제목변경함수(copy.sort());
          }}>정렬버튼</button>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
        <button onClick = {() => {
          setModal(modal+1);
        }}>모달창</button>
        {
          1 == (modal % 2) ? <Modal/> : null
        }
        
      </div>
      
      
      

      <Routes>
      <Route path="/" element={ <div>으하하 메인페이지. board project에서 .git을 없앰 rm -rf .git ㄴㄴㄴdsadaㄴ</div> } />
      <Route path="/detail" element={ <div>상세페이지임</div> } />
        <Route path="/about" element={ <div>어바웃페이지임 haha</div> } />
      </Routes>
    </div>
  );
}

function Modal(){
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;



