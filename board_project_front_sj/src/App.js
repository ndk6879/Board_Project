/* eslint-disable */

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar.js";  // 왜 {} 하면 에러남?
import MainPage from "./pages/MainPage.js";
import PostDetailsPage from "./pages/PostDetailsPage.js";
import ForumData from "./store/ForumData.js";
import QnaData from "./store/QnaData.js";

function App() {

  return (
    <div className="App">

      <Navbar/>

      <Routes>
          <Route path="/" element={ < MainPage/> }/>

          {/* props로 카테고리 넘겨주기 vs 데이터 자체를 넘겨주기 ????? */}
          <Route path="/forum/:id" element={ <PostDetailsPage contents={ForumData}/> }/>
          <Route path="/qna/:id" element={ <PostDetailsPage contents={QnaData}/> }/>
      </Routes>

    </div>
  );
}

export default App;
