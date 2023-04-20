/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginModal } from "../store.js";

import Pagination from "./Pagination.js";

// 몇 개씩 볼 건지
let SelectBox = styled.div`
  margin : 10px 0px;
  display : flex;  // 아이템들을 가로 또는 세로 방향으로 배치할 수 있는 방식
  align-items : center;  // 자식 요소의 세로 정렬
  justify-content : right;  // 자식 요소의 가로 정렬
`

let Select = styled.select`
  width : 35%;
  margin-right : 3px;
  font-size : 15px;
  cursor : pointer;
`

let Table = styled.table`
  width : 100%;
  border-top : 2px solid black;
`

let Th = styled.th`
  padding : 15px 5px;
  border-bottom : 1px solid lightgray;  // 끊어진다잉 ㅠㅠ
`

let Td = styled.td`
  padding : 10px 2px;
  border-bottom : 1px solid lightgray;
`

let TitleInfo = styled.div`
  float : left;
  margin : auto 15px;  // 제목 앞 + 제목 ~ 댓글수 간격 두기
  cursor : pointer;  // 마우스 가져갔을 때 손가락 모양으로

  // 제목이 긴 경우
  overflow : hidden;  // 글자 자르기
  white-space : nowrap;  // 줄바꿈 방지
  text-overflow : ellipsis;  // 말줄임표(...) 표시
  max-width : 260px;  // 최대 길이 지정 :: %로 하고싶음.. +) 얘 없어도 잘 되던데 난 안 됨 ㅠ

  &:hover{
    text-decoration : underline;
    //text-underline-position : under;  // 얘 안 먹힌다 ㅠ
  }
`

let Comment = styled.div`
  float : left;
  font-weight : 500;
  color : tomato;
`

let AddBtnBox = styled.div`
  display : flex;  // 아이템들을 가로 또는 세로 방향으로 배치할 수 있는 방식
  align-items : center;  // 자식 요소의 세로 정렬
  justify-content : right;  // 자식 요소의 가로 정렬
  margin : 10px 0px;
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

function PostList(props) {

  let navigate = useNavigate();
  let dispatch = useDispatch();

  // 카테고리에 맞게 데이터 가지고 오기
  let contents = (props.category == "forum"
                  ? useSelector((state) => state.postData.forum)
                  : useSelector((state) => state.postData.qna));
  // 최신순으로
  let copyForContents = [...contents].reverse();

  // 페이지네이션을 위한 state들
  let [limit, setLimit] = useState(10);  // 한 페이지에 보여줄 게시글 개수
  let [curPage, setCurPage] = useState(1);  // 현재 페이지 번호
  let offset = (curPage - 1) * limit;  // 현재 페이지 첫 게시글 인덱스
  

  // 로그인 여부 확인
  let session = useSelector((state) => state.session);

  // 로그인 상태면 글쓰기 허용, 아니면 로그인 먼저 하도록 모달창 띄워주기
  let tryWrite = () => {
    if (session.isLoggedIn) navigate("/write");
    else {
      alert("로그인 안 하셨는데요?");
      dispatch(setLoginModal(true));
      window.scrollTo({ top: 0, behavior : "smooth" });  // 로그인 모달창 보이도록 페이지 맨위로 이동시키기
    }
  }

  
  // 페이지 들어올 때, 새로고침 할 때 맨 위로 올림
  useEffect(() => { window.scrollTo({ top : 0 })}, []);

  return (
    <>
      <SelectBox>
        <Select
          required defaultValue="10"
          type="number"
          name="limit"
          onChange={e => setLimit(parseInt(e.currentTarget.value))}
        >
          <option value="5">5개</option>
          <option value="10">10개</option>
          <option value="20">20개</option>
        </Select>
      </SelectBox>
      <Table>
        <thead>
          <tr>
            <Th style={{ width : "70%"}}>제목</Th>
            <Th>작성일</Th>
            <Th>작성자</Th>
          </tr>
        </thead>
        <tbody>
          {
            copyForContents.slice(offset, offset + limit).map((data, i) => {
              return (
                <tr key={i}>
                  <Td>
                    <TitleInfo onClick={(e) => { navigate(`/${props.category}/${data._id}`); }}>
                      {data.title}
                    </TitleInfo>
                    <Comment>[{data.comment}]</Comment>
                  </Td>
                  <Td>{data.date}</Td>
                  <Td>{data.author}</Td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <AddBtnBox>
          <AddBtn onClick={ tryWrite }>글쓰기</AddBtn>
      </AddBtnBox>
      <Pagination total={copyForContents.length} limit={limit} curPage={curPage} setCurPage={setCurPage}/>
    </>
  )

}

export default PostList;