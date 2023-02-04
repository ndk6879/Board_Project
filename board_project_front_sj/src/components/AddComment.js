/* eslint-disable */

import styled from "styled-components";

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
    background-color : whitesmoke;
    width : 45px;
    height : 30px;
    border : 1px solid darkgray;
    border-radius : 5px;
    float : right;
    //margin : 3px;
    margin-right : 15px;
`

function AddComment() {
    return (
        <div>
            <AddCommentBox>
                <InputCommentData placeholder = "댓글을 입력하세용"/>
                <AddCommentBtn>등록</AddCommentBtn>
            </AddCommentBox>
        </div>
    );
}

export default AddComment;