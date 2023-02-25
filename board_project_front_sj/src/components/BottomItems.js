/* eslint-disable */

// 페이지 이동, 검색

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginModal } from "../store.js";

let OutsideBox = styled.div`
  margin : 10px 0px;
  border : 1px solid black;
`

let BtnBox = styled.div`
  display : flex;  // 아이템들을 가로 또는 세로 방향으로 배치할 수 있는 방식
  align-items : center;  // 자식 요소의 세로 정렬
  justify-content : right;  // 자식 요소의 가로 정렬
  margin : 10px 5px;
  border : 1px solid darkorange;
`

let AddBtn = styled.button`
  width : 60px;
  height : 28px;
  font-size : 14px;
  background-color : powderblue;
  border : thin solid black;
  border-radius: 5px;
  cursor : pointer;  // 마우스 가져갔을 때 손가락 모양으로
  // 마우스 대면 효과 생기게
  &:hover{
      background-color: cadetblue;
      color: white;
  }
`

let PageNumBox = styled.div`
  margin-top : 35px;
  //border : 1px solid red;
  display : flex;
  align-items : center;  // 자식 요소의 세로 정렬
  justify-content : center;  // 자식 요소의 가로 정렬
`

let TurnPageBtn = styled.div`
  font-size : 13px;
  border : 0px;
  background-color: white;
  margin : 7px;
  border : 1px solid violet;
  cursor : pointer;
`

let SearchBox = styled.div`
  height : 25px;
  margin : 10px 0px;
  border : 1px solid blue;
  display : flex;
  align-items : center;  // 자식 요소의 세로 정렬
  justify-content : center;  // 자식 요소의 가로 정렬
`

let Select = styled.select`
  width : 150px;
  height : 25px;
  margin-right : 5px;
  cursor : pointer;
`

let InputSearch = styled.input`
  width : 230px;
  padding : 3px;
  //height : 20px;
  margin-right : 2px;
`

let SearchBtn = styled.button`
  height : 25px;
  vertical-align : top;
  cursor : pointer;
`

function BottomItems() {
  
  let navigate = useNavigate();
  let dispatch = useDispatch();
  
  let session = useSelector((state) => state.session);

  // 로그인 상태면 글쓰기 허용, 아니면 로그인 먼저 하도록 모달창 띄워주기
  let tryWrite = () => {
    if (session.isLoggedIn) navigate("/write");
    else {
      alert("로그인 안 하셨는데요?");
      dispatch(setLoginModal());
      window.scrollTo({ top: 0, behavior : "smooth" });  // 로그인 모달창 보이도록 페이지 맨위로 이동시키기
    }
  }

  return (
    <OutsideBox>
      <BtnBox>
          <AddBtn onClick={ tryWrite }>글쓰기</AddBtn>
      </BtnBox>
      <PageNumBox>
        <TurnPageBtn>&lt;이전</TurnPageBtn>
        <TurnPageBtn>1</TurnPageBtn>
        <TurnPageBtn>2</TurnPageBtn>
        <TurnPageBtn>3</TurnPageBtn>
        <TurnPageBtn>다음&gt;</TurnPageBtn>
      </PageNumBox>
      <SearchBox>
        <Select>
          <option>게시글+댓글</option>
          <option>게시글만</option>
          <option>댓글만</option>
          <option>작성자</option>
        </Select>
        <InputSearch placeholder="검색어를 입력해주세요"/>
        <SearchBtn>검색</SearchBtn>
      </SearchBox>
    </OutsideBox>
  )
}

export default BottomItems;