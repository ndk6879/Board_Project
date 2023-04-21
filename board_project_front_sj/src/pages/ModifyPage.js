/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import ModifyBox from "../components/ModifyBox.js";

let OutsideBox = styled.div`
    width : 95%;  // 나중에 px로 바꿀 것 (전체화면 기준)
    margin : 30px auto;
`

let Header = styled.div`
    margin : 15px 0px;
    text-align : left;
    font-size : 25px;
    font-weight : bold;
`

function ModifyPage() {

    let {category, id} = useParams();
    let [post, setPost] = useState("");

    let getPostData = () => {
        axios.get(`/${category}/${id}`).then(data => {
            setPost(data.data.data);
        });
    }

    // 페이지 들어올 때, 새로고침 할 때
    // 1) 게시글 id에 기반해서 게시글 데이터 get 요청을 하도록 함
    // 2) 페이지 맨 위로 올림
    useEffect(() => {
        getPostData();
        window.scrollTo({ top : 0 })
    }, []);

    return (
        <OutsideBox>
            <Header>수정하기</Header>
            <ModifyBox post={post}/>
        </OutsideBox>
    )
}

export default ModifyPage;