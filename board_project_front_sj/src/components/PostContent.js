// Post Header + Content

/* eslint-disable */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 제목 + 추가정보
let Header = styled.div`
    background-color : whitesmoke;
    //width : 100vw;  // 왜 이걸 하는데 가로 스크롤바가 생기지
    height : fit-content; // 내용 길이에 맞춰서
    padding : 25px;
`

let TitleInfo = styled.div`
    text-align : left;
    font-size : 21px;
`

// 글쓴이 + 날짜 + 조회수
let AdditionalInfo = styled.div`
    margin-top : 20px;
    display : flex;
    align-items : center;
    justify-content : flex-start;
`

let WriterInfo = styled.div`
    font-size : 15px;
    margin-right : auto;  // 날짜, 조회수 오른쪽에 붙이기
`

let PostDate = styled.div`
    font-size : 15px;
`

let Hits = styled.div`
    font-size : 14px;
    margin-left : 15px;
`

// 내용 + 좋아요버튼 + 댓글수
let ContentBox = styled.div`
    width : 90%;
    height : fit-content; // 내용 길이에 맞춰서
    border : 1px solid darkgray;
    border-radius : 10px;
    margin : 10px auto;
    padding : 10px;
    padding-bottom : 70px;  // 좋아요+댓글 보여줄 공간
    position : relative;
`

// 내용 부분
let Content = styled.div`
    width : 95%;
    margin : 15px;
    text-align : left;
    white-space : pre-line;  // 데이터 내에 존재하는 개행 + 자동 줄바꿈
    font-size : 15px;
`

let LikeAndCommentBox = styled.div`
    position : absolute;
    bottom : 15px;
    font-size : 14px;
    margin-left : 5px;
`

// 하트 눌렀을 때만 좋아요 올라갔으면 좋겠어서 따로 만듦
let LikeButton = styled.div`
    float : left;
    cursor : pointer;
`

let LikeInfo = styled.div`
    float : left;
    padding-left : 5px;
`

let CommentInfo = styled.div`
    float : left;
    padding-left : 15px;
`

let BtnBox = styled.div`
    width : 92%;
    margin : auto;
    display : flex;
    justify-content : flex-start;
    //border : 1px solid indigo;
`

let Btn = styled.button`
  width : 55px;
  height : 28px;
  font-size : 14px;
  background-color : lightgray;
  border : thin solid black;
  border-radius: 5px;
  cursor : pointer;  // 마우스 가져갔을 때 손가락 모양으로
  // 마우스 대면 효과 생기게
  &:hover{
      background-color: gray;
      color: white;
  }
`

let ListBtn = styled(Btn)`
  margin-right : auto;
  background-color : powderblue;
  &:hover{
    background-color : cadetblue;
  }
`

function PostContent(props) {
    
    let navigate = useNavigate();

    let [like, setLike] = useState(0);

    return (
        <div>
            <Header>
                <TitleInfo>{ props.post.title }</TitleInfo>
                <AdditionalInfo>
                    <WriterInfo>{ props.post.author }</WriterInfo>
                    <PostDate>{ props.post.date }</PostDate>
                    <Hits>조회 0</Hits>
                </AdditionalInfo>
                {/* 프로필 사진은? ID는? 닉네임은? */}
            </Header>
            <ContentBox>
                <Content>{ props.post.content }</Content>
                <LikeAndCommentBox>
                    <LikeButton onClick={() => {setLike(like+1)}}>❤️</LikeButton>
                    <LikeInfo> 좋아요 {like}</LikeInfo>
                    <CommentInfo>🗨️ 댓글 0</CommentInfo>
                </LikeAndCommentBox>
            </ContentBox>
            <BtnBox>
                <ListBtn onClick={() => navigate(`/${props.category}`)}>
                목록
                </ListBtn>
                {/* 수정/삭제 버튼 내가 쓴 글에서만 보이게 바꿀 예정 */}
                <Btn style={{ marginRight : "7px" }}>수정</Btn>
                <Btn>삭제</Btn>
            </BtnBox>
        </div>
    );
}

export default PostContent