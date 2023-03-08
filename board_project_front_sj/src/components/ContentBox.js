/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { setLoginModal } from "../store.js";

let OutsideBox = styled.div`
  margin-top : 20px;
  border-top : 1.5px solid black;
`

// 게시판 선택, 제목 입력
let ContentHeader = styled.div`
  height : 37px;
  margin : 10px 0px;
  display : flex;
`

let Select = styled.select`
  width : 35%;
  margin-right : 3px;
  font-size : 15px;
  cursor : pointer;
`

let InputTitle = styled.input`
  width : 65%;
  font-size : 15px;
`

let InputContent = styled.input`
  width : 99%;  // 왜 삐져나오냐고 킹
  height : 200px;
  font-size : 15px;
`

let UploadBtn = styled.button`  // 얘는 왜 OutsideBox 안에 안 들어가는겨
  width : 60px;
  height : 28px;
  margin : 10px 5px;
  float : right;
  background-color : powderblue;
  font-size : 14px;
  border : thin solid black;
  border-radius: 5px;
  cursor : pointer;  // 마우스 가져갔을 때 손가락 모양으로
  // 마우스 대면 효과 생기게
  &:hover{
      background-color: cadetblue;
      color: white;
  }
`

function ContentBox() {

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let [inputType, setInputType] = useState("");
  let [inputTitle, setInputTitle] = useState("");
  let [inputContent, setInputContent] = useState("");
  let isLoggedIn = useSelector((state) => state.session.isLoggedIn);

  // 로그인 되어있는 경우에만 write 페이지 들어가도록
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 안 하셨는데요?");
      navigate("/");
      dispatch(setLoginModal(true));
      window.scrollTo({ top: 0, behavior : "smooth" });
    }
  }, [])

  // post 요청 시 서버로 보낼 새 게시글 데이터
  let body = {
      title : inputTitle,
      content : inputContent,
      type : inputType
  };
  
  let createNewPost = e => {
    e.preventDefault();

    if (!inputType) alert("게시판을 선택해주세요.");
    else if (!inputTitle) alert("제목을 입력하세요.");
    else if (!inputContent) alert("내용을 입력하세요.");
    else {
      console.log(body);
      axios.post("/add", body)
      .then(response => {
        console.log(response);
        alert("게시글 작성이 완료되었습니다.")
        navigate("/");
      }).catch(err => {
        console.log("createNewPost 함수 에러");
        console.log(err);
      });
    }
  }

  return (
    <OutsideBox>
      <form onSubmit={ createNewPost } action="/add" method="POST">
        <ContentHeader>
          <Select
          required defaultValue="default"
          type="text"
          name="type"
          onChange={e => setInputType(e.currentTarget.value)}
          >
            <option disabled value="default" style={{ display: "none" }}>게시판을 선택해주세요.</option>
            <option value="forum">Forum</option>
            <option value="QA">Q&A</option>
          </Select>
          <InputTitle
          placeholder="제목을 입력해주세요."
          type="text"
          name="title"
          onChange = {e => { setInputTitle(e.target.value); }}/>
        </ContentHeader>
        <InputContent
        placeholder="내용을 입력해주세요."
        type="text"
        name="content"
        onChange = {e => { setInputContent(e.target.value); }}/>
        <UploadBtn type="submit">등록</UploadBtn>
      </form>
    </OutsideBox>
  )
}

export default ContentBox;