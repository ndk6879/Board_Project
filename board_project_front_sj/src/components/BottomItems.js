/* eslint-disable */

// 페이지 이동, 검색

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginModal } from "../store.js";

let OutsideBox = styled.div`
  margin : 10px 0px;
  padding-bottom : 70px;
  //border : 1px solid black;
`

let SearchBox = styled.div`
  height : 25px;
  margin : 10px 0px;
  //border : 1px solid blue;
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
  return (
    <OutsideBox>
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