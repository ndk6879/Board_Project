/* eslint-disable */

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setForumData, setQnaData } from "./store.js";

import Navbar from "./components/Navbar.js";  // 왜 {} 하면 에러남?
import MainPage from "./pages/MainPage.js";
import PostListPage from "./pages/PostListPage.js";
import PostDetailsPage from "./pages/PostDetailsPage.js";
import SignupPage from "./pages/SignupPage.js";
import MyPage from "./pages/MyPage.js";
import WritePage from "./pages/WritePage.js";
import ModifyPage from "./pages/ModifyPage.js";

import ForumData from "./store/ForumData.js";
import QnaData from "./store/QnaData.js";

function App() {

  // let [forumData, setForumData] = useState([]);
  // let [qnaData, setQnaData] = useState([]);

  let dispatch = useDispatch();
  let forumData = useSelector((state) => state.postData.forum);
  let qnaData = useSelector((state) => state.postData.qna);

  // 서버에서 게시글 데이터 가져오기
  let pullData = () => {
    console.log("F5");
    axios.get("/forum").then(data => {
      let copiedForumData = [...forumData];
      copiedForumData = data.data.data;
      dispatch(setForumData(copiedForumData));
    })
    axios.get("/qna").then(data => {
      let copiedQnaData = [...qnaData];
      copiedQnaData = data.data.data;
      dispatch(setQnaData(copiedQnaData));
    })
  }
  
  useEffect(() => { pullData(); }, [])  // []를 지워야 하나

  return (
    <div className="App">

      <Navbar/>

      <Routes>
          {/* props로 카테고리 넘겨주기 vs 데이터 자체를 넘겨주기 ????? */}
          <Route path="/" element={ < MainPage/> }/>
          <Route path="/forum" element={ <PostListPage category="forum"/> }/>
          <Route path="/:category/:id" element={ <PostDetailsPage/> }/>
          <Route path="/qna" element={ <PostListPage category="qna"/> }/>
          <Route path="/:category/:id" element={ <PostDetailsPage/> }/>
          <Route path="/signup" element={ <SignupPage/>}/>

          {/* 로그인 이후에 접속할 수 있는 사이트 */}
          <Route path="/mypage" element={ <MyPage/> }/>
          <Route path="/write" element={ <WritePage/> }/>
          <Route path="/:category/:id/modify" element={ <ModifyPage/> }/>
      </Routes>

    </div>
  );
}

export default App;
