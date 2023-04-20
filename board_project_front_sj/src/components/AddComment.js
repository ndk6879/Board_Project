/* eslint-disable */

import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLoginModal } from "../store.js";

let AddCommentBox = styled.div`
    width : 90%;
    height : fit-content;  // 등록 버튼도 안에 있는거 아님?
    border : 1px solid darkgray;
    border-radius : 7px;
    margin : 20px auto;
    position : relative;
`

let InputCommentData = styled.textarea`
    width : 95%;
    min-height : 70px;  // 최소 높이 지정
    margin-top : 10px;
    margin-bottom : 3px;
    font-size : 14px;
    resize : vertical;
`

let BtnBox = styled.div`
    height : 30px;
    margin-bottom : 7px;
`

let AddCommentBtn = styled.button`
    background-color : powderblue;
    width : 45px;
    height : 30px;
    border : 1px solid black;
    border-radius : 5px;
    float : right;
    //margin : 3px;
    margin-right : 12px;
    cursor : pointer;
    &:hover{
        background-color : cadetblue;
        color : white;
    }
`

function AddComment(props) {

    let dispatch = useDispatch();

    let [comment, setComment] = useState('');
    let isLoggedIn = useSelector((state) => state.session.isLoggedIn);

    let tryAddComment = (e) => {
        e.preventDefault();

        // 로그인 여부 확인
        if (!isLoggedIn) {
            dispatch(setLoginModal(true));
            window.scrollTo({ top : 0, behavior : "smooth" });
            return alert("로그인 안 하셨는데요?");
        }

        // 서버에 보낼 댓글 데이터
        let body = {
            post : props.id,
            type : props.category,
            comment : comment
        };

        if (!comment) alert("내용을 입력하세요.");
        else {
            console.log(('data:' + JSON.stringify(body)));
            axios.post("/comment", body)
            .then(response => {
                if (response.data.message == "OK") {
                    alert("댓글 작성 완료!");
                    e.target.reset();  // 댓글창 비우기
                    props.setUpdateState({});  // 새로운 댓글이 바로 반영되도록
                }
            }).catch((err) => {
                console.log("tryAddComment 함수 에러");
                console.log(err);
            });
        }
    }

    return (
        <form onSubmit={ tryAddComment }>
            <AddCommentBox>
                <InputCommentData
                placeholder = "댓글을 입력하세용"
                onChange={e => { setComment(e.target.value); }}
                />
                <BtnBox>
                    <AddCommentBtn type="submit">등록</AddCommentBtn>
                </BtnBox>
            </AddCommentBox>
        </form>
    );
}

export default AddComment;