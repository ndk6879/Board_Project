/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setLoginModal } from "../store.js";
import axios from "axios";

let OutsideBox = styled.div`
    margin-top : 20px;
    border-top : 1.5px solid black;
`

// 게시판 선택, 제목 입력
let ContentHeader = styled.div`
    height : 37px;
    margin : 10px 0px;
    display : flex;
`

let Select = styled.select`
    width : 35%;
    margin-right : 3px;
    font-size : 15px;
    cursor : pointer;
`

let InputTitle = styled.input`
    width : 65%;
    font-size : 15px;
`

let InputContent = styled.input`
    width : 99%;  // 왜 삐져나오냐고 킹
    height : 200px;
    font-size : 15px;
`

let UploadBtn = styled.button`  // 얘는 왜 OutsideBox 안에 안 들어가는겨
    width : 60px;
    height : 28px;
    margin : 10px 5px;
    float : right;
    background-color : powderblue;
    font-size : 14px;
    border : thin solid black;
    border-radius: 5px;
    cursor : pointer;  // 마우스 가져갔을 때 손가락 모양으로
    // 마우스 대면 효과 생기게
    &:hover{
        background-color: cadetblue;
        color: white;
    }
`

function ModifyBox({post}) {

    let navigate = useNavigate();
    let dispatch = useDispatch();

    let {category, id} = useParams();

    let [inputType, setInputType] = useState();
    let [inputTitle, setInputTitle] = useState();
    let [inputContent, setInputContent] = useState();
    let isLoggedIn = useSelector((state) => state.session.isLoggedIn);

    let putPostData = e => {
        e.preventDefault();

        if (!inputType) alert("게시판을 선택해주세요.");
        else if (!inputTitle) alert("제목을 입력하세요.");
        else if (!inputContent) alert("내용을 입력하세요.");
        else {
            console.log(body);
            console.log("put요청해야지");
            axios.put(`/post/${id}`, body)
            .then(response => {
                if (response.data.message == "OK") {
                    console.log(response);
                    alert("게시글 수정이 완료되었습니다.")
                    navigate(`/${category}/${id}`);
                }
            }).catch(err => {
                console.log("createNewPost 함수 에러");
                console.log(err);
            });
        }
    }
    
    // 로그인 되어있는 경우에만 write 페이지 들어가도록
    // 주소 입력해서 들어가는 경우 대비
    useEffect(() => {
        if (!isLoggedIn) {
            alert("로그인 안 하셨는데요?");
            navigate("/");
            dispatch(setLoginModal(true));
            window.scrollTo({ top: 0, behavior : "smooth" });
        }
    }, [])

    // put 요청에 사용할 state 초기값 저장
    useEffect(() => {
        setInputType(post.type);
        setInputTitle(post.title);
        setInputContent(post.content);
    }, [post])

    // put 요청 시 서버로 보낼 새 게시글 데이터
    let body = {
        title : inputTitle,
        content : inputContent,
        type : inputType
    };

    return (
        <OutsideBox>
        <form onSubmit={ putPostData } method="PUT">
            <ContentHeader>
            <Select
            required defaultValue={inputType}
            type="text"
            name="type"
            onChange={e => setInputType(e.currentTarget.value)}
            >
                <option value="forum">Forum</option>
                <option value="qna">Q&A</option>
            </Select>
            <InputTitle
            placeholder="제목을 입력해주세요."
            type="text"
            name="title"
            value={inputTitle}
            onChange = {e => { setInputTitle(e.target.value); }}/>
            </ContentHeader>
            <InputContent
            placeholder="내용을 입력해주세요."
            type="text"
            name="content"
            value={inputContent}
            onChange = {e => { setInputContent(e.target.value); }}/>
            <UploadBtn type="submit">등록</UploadBtn>
        </form>
        </OutsideBox>
    )
}

export default ModifyBox;