/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

const AddCommentBox = styled.div`
    width : 90%;
    height : fit-content;  // 등록 버튼도 안에 있는거 아님?
    border :1px solid darkgray;
    border-radius : 7px;
    margin : 20px auto;
    position : relative;
`

const InputCommentData = styled.textarea`
    width : 95%;
    min-height : 70px;  // 최소 높이 지정
    margin-top : 10px;
    margin-bottom : 3px;
    font-size : 14px;
    resize : vertical;
`

const BtnBox = styled.div`
    height : 30px;
    margin-bottom : 7px;
`

const Btn = styled.button`
    background-color : powderblue;
    width : 45px;
    height : 30px;
    border : 1px solid black;
    border-radius : 5px;
    float : right;
    margin-right : 12px;
    cursor : pointer;
    &:hover{
        background-color : cadetblue;
        color : white;
    }
`

function ModifyComment(props) {

    const [inputComment, setInputComment] = useState();

    // put 요청에 사용할 state 초기값 저장
    useEffect(() => {
        setInputComment(props.data.comment);
    }, [props.post])

    // 서버에 보낼 댓글 데이터
    const body = {
        comment : inputComment
    };

    // 댓글 수정 함수
    const tryModifyComment = e => {
        console.log("modify!");
        e.preventDefault();

        if (!inputComment) alert("내용을 입력해주세요.");
        else {
            console.log(body);
            console.log("put요청해야지");
            axios.put(`/comment/${props.data._id}`, body)
            .then(response => {
                // response.data.message :: 댓글 수정 성공했을 때 OK 옴
                if (response.data.message == "OK") {
                    console.log(response);
                    alert("댓글 수정이 완료되었습니다.");
                    props.setUpdateState({});  // 댓글이 바로 반영되도록
                    props.setShowComment(true);
                }
            }).catch(err => {
                console.log("tryModifyComment 함수 에러");
                console.log(err);
            });
        }
    }

    return (
        <>
            <form onSubmit={ tryModifyComment }>
                <AddCommentBox>
                    <InputCommentData
                    placeholder = "댓글을 입력하세용"
                    value={inputComment}
                    onChange={e => { setInputComment(e.target.value); }}
                    />
                    <BtnBox>
                        <Btn type="submit">수정</Btn>
                        <Btn type="button"
                        onClick={ () => props.setShowComment(true) }
                        >취소</Btn>
                    </BtnBox>
                </AddCommentBox>
            </form>
        </>
    )
}

export default ModifyComment;