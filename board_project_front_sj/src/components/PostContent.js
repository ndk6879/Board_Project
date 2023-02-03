// Post Header + Content

/* eslint-disable */

import { useState } from "react";
import styled from "styled-components";
import ForumData from "../store/ForumData.js";

// 제목 + 글쓴이 + 날짜
let Header = styled.div`
    background-color : whitesmoke;
    //width : 100vw;  // 왜 이걸 하는데 가로 스크롤바가 생기지
    height : fit-content; // 내용 길이에 맞춰서
    padding : 20px;
    padding-left : 30px;
    padding-bottom : 37px;
`

let TitleInfo = styled.div`
    text-align : left;
    font-size : 20px;
    padding-bottom : 12px;
`

let WriterInfo = styled.div`
    text-align : left;
    font-size : 15px;
    float : left;
`

let PostDate = styled.div`
    float : right;
    font-size : 15px;
`

// 내용 + 좋아요버튼 + 댓글수
let ContentBox = styled.div`
    width : 90%;
    height : fit-content; // 내용 길이에 맞춰서
    border : 1px solid darkgray;
    border-radius : 10px;
    margin : auto;
    margin-top : 15px;
    padding : 10px;
    padding-bottom : 70px;
    position : relative;
`

// 내용 부분
let Content = styled.div`
    width : 95%;
    margin : 10px;
    text-align : left;
    white-space : pre-line;  // 데이터 내에 존재하는 개행 + 자동 줄바꿈
    font-size : 15px;
`

let LikeAndCommentBox = styled.div`
    position : absolute;
    bottom : 10px;
    font-size : 14px;
    padding-left : 3px;
`

// 하트 눌렀을 때만 좋아요 올라갔으면 좋겠어서 따로 만듦
let LikeButton = styled.div`
    float : left;
`

let LikeInfo = styled.div`
    float : left;
    padding-left : 5px;
`

let CommentInfo = styled.div`
    float : left;
    padding-left : 15px;
`

function PostContent({post}) {
    let [like, setLike] = useState(0);
    return (
        <div>
            <Header>
                <TitleInfo>{ post.title }</TitleInfo>
                <WriterInfo>{ post.writer }</WriterInfo>
                <PostDate>{ post.date }</PostDate>
                {/*
                - 제목 길어졌을 때 높이 맘에 안 듦 :: 된 거 같기두
                - 프로필 사진은? ID는? 닉네임은?
                */}
            </Header>
            <ContentBox>
                <Content>{ post.content }</Content>
                <LikeAndCommentBox>
                    <LikeButton onClick={() => {setLike(like+1)}}>❤️</LikeButton>
                    <LikeInfo> 좋아요 {like}</LikeInfo>
                    <CommentInfo>🗨️ 댓글 0</CommentInfo>
                </LikeAndCommentBox>
            </ContentBox>
        </div>
    );
}

export default PostContent