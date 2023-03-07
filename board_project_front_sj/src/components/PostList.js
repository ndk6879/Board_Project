/* eslint-disable */

import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

function PostList(props) {

  let navigate = useNavigate();

  // 카테고리에 맞게 데이터 가지고 오기
  let contents = (props.category == "forum"
                  ? useSelector((state) => state.postData.forum)
                  : useSelector((state) => state.postData.qna));
  // 최신순으로
  let copyForContents = [...contents].reverse();

  // 페이지 들어올 때, 새로고침 할 때 맨 위로 올림
  useEffect(() => { window.scrollTo({ top : 0 })}, []);

  return (
    <>
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
            copyForContents.map((data, i) => {
              return (
                <tr key={i}>
                  <Td>
                    <TitleInfo onClick={(e) => { navigate(`/${props.category}/${data._id}`); }}>
                      {data.title}
                    </TitleInfo>
                    <Comment>[0]</Comment>
                  </Td>
                  <Td>{data.date}</Td>
                  <Td>{data.author}</Td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  )

}

export default PostList;