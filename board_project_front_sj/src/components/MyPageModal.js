/* eslint-disable */

import styled from "styled-components";
import { useState } from "react";
import userImg from "../img/user.png";

let Background = styled.div`
    position : absolute;
    width : 100vw;
    height : 100vh;
    background-color : none;
    z-index : 150;  // 캐러셀 버튼 z-index가 100임
`

let ModalBox = styled.div`
    width : 300px;
    height : 200px;
    float : right;
    background-color : white;
    border : 1px solid black;
    border-radius : 10px;
    margin-right : 3px;
    padding-top : 10px;
    text-align : center;
`

let ProfileBox = styled.div`
    width : 270px;
    height : 135px;
    border : 1px solid gray;
    margin : auto;
    margin-top: 3px;
`

let UserProfile = styled.img`
    width : 80px;
    height : 80px;
    float : left;
    margin-top : 25px;
    margin-left : 20px;
`

let UserInfo = styled.div`
    float : left;
    display : flex;
    align-items : left;
    margin-top : 20px;
    margin-left : 22px;
    margin-bottom : 5px;
`

let BtnInProfile = styled.button`
    background-color : lightgray;
    width : 140px;
    height : 30px;
    border : 0px;
    border-radius : 5px;
    margin : 3px;
    margin-left : 5px;
    font-size : 15px;
`

let LogoutBtn = styled.button`
    background-color : powderblue;
    width : 270px;
    height : 35px;
    border : 0px;
    border-radius : 5px;
    margin-top : 7px;
    font-size : 15px;
`

function MyPageModal(props) {
    return (
        <Background onClick={() => { props.setMyPageModal(false) }}>
            <ModalBox>
                <ProfileBox>
                    <UserProfile src={userImg}/>
                    <UserInfo>이름 : 유저이름</UserInfo>
                    <BtnInProfile>마이페이지</BtnInProfile>
                    <BtnInProfile>글쓰기</BtnInProfile>
                </ProfileBox>
                <LogoutBtn onClick={() => {
                    props.setIsLoggedIn(false);
                    props.setMyPageModal(false);
                }}>로그아웃</LogoutBtn>
            </ModalBox>
        </Background>
    );
}

export default MyPageModal;