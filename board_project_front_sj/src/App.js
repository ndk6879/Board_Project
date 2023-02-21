/* eslint-disable */

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar.js";  // 왜 {} 하면 에러남?
import MainPage from "./pages/MainPage.js";
import PostListPage from "./pages/PostListPage.js";
import PostDetailsPage from "./pages/PostDetailsPage.js";
import MyPage from "./pages/MyPage.js";
import WritePage from "./pages/WritePage.js";

import ForumData from "./store/ForumData.js";
import QnaData from "./store/QnaData.js";

function App() {

  let [forumData, setForumData] = useState([]);
  let [qnaData, setQnaData] = useState([]);

  // 서버에서 게시글 데이터 가져오기
  let pullData = () => {
    axios.get("/list/post/forum").then(data => {
      let copiedForumData = [...forumData];
      copiedForumData = data.data;
      setForumData(copiedForumData);
    })
    axios.get("/list/post/qa").then(data => {
      let copiedQnaData = [...qnaData];
      copiedQnaData = data.data;
      setQnaData(copiedQnaData);
    })
  }
  
  useEffect(() => { pullData(); }, [])  // []를 지워야 하나

  return (
    <div className="App">

      <Navbar/>

      <Routes>
          {/* props로 카테고리 넘겨주기 vs 데이터 자체를 넘겨주기 ????? */}
          <Route path="/" element={ < MainPage forumData={forumData} qnaData={qnaData}/> }/>
          <Route path="/forum" element={ <PostListPage categoryTitle="Forum" contents={forumData}/> }/>
          <Route path="/forum/:id" element={ <PostDetailsPage contents={ForumData}/> }/>
          <Route path="/qna" element={ <PostListPage categoryTitle="Q&A" contents={qnaData}/> }/>
          <Route path="/qna/:id" element={ <PostDetailsPage contents={QnaData}/> }/>

          {/* 로그인 이후에 접속할 수 있는 사이트 */}
          <Route path="/mypage" element={ <MyPage/> }/>
          <Route path="/write" element={ <WritePage/> }/>
      </Routes>

    </div>
  );
}

export default App;
