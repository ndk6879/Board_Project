/* eslint-disable */

import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLoginModal } from "../store.js";

let AddCommentBox = styled.div`
    width : 90%;
    //height : fit-content;  // 등록 버튼도 안에 있는거 아님?
    height : 130px;
    border : 1px solid darkgray;
    border-radius : 10px;
    margin : auto;
    margin-top : 15px;
    position : relative;
`

let InputCommentData = styled.input`
    width : 95%;
    height : 70px;
    margin : 8px;
`

let AddCommentBtn = styled.button`
    background-color : powderblue;
    width : 45px;
    height : 30px;
    border : 1px solid black;
    border-radius : 5px;
    float : right;
    //margin : 3px;
    margin-right : 15px;
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
            comment : comment
        };

        if (!comment) alert("내용을 입력하세요.");
        else {
            console.log("post요청 해야징");
            console.log(('data:' + JSON.stringify(body)));
            axios.post("/comment", body)
            .then(response => {
                if (response.data == "댓글추가 완료") {
                    console.log("댓글 추가 완료");
                    // 새로운 댓글이 바로 보이도록 코드 추가 필요
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
                <AddCommentBtn type="submit">등록</AddCommentBtn>
            </AddCommentBox>
        </form>
    );
}

export default AddComment;