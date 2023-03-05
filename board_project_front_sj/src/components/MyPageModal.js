/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn, setUserData, setMyPageModal } from "../store.js";

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
    font-size : 15px;
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
    cursor : pointer;
`

let LogoutBtn = styled.button`
    background-color : powderblue;
    width : 270px;
    height : 35px;
    border : 0px;
    border-radius : 5px;
    margin-top : 7px;
    font-size : 15px;
    cursor : pointer;
`

// 로그인 상태에서 상단바의 'My Page / Logout' 을 누르면 보여줄 모달
function MyPageModal() {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let session = useSelector((state) => state.session);

    useEffect(() => { console.log("before logout:", session) }, []);

    /*
    로그아웃 함수
    - 로그아웃 버튼을 누르면 로그아웃 상태로 변경
    - 로그인 상태 저장하는 state를 false로
    - 로그인한 유저 정보를 저장하는 state 비우기
    */
    let logout = e => {
        e.preventDefault();

        axios.post("/logout", "logout")
        .then(response => {
            console.log("from server:", response.data);
            if (response.data.message == "logout") {
                alert("로그아웃 완료!");
                dispatch(setIsLoggedIn(false));
                dispatch(setUserData({ _id : '', id : '', pw : '' }));  // 로그인한 유저 정보 없애기
                dispatch(setMyPageModal(false));
            }
        }).catch(err => {
            console.log("로그아웃 에러");
            console.log(err);
        })
    }

    return (
        <Background onClick={() => { dispatch(setMyPageModal(false)) }}>
            <ModalBox onClick={ e => e.stopPropagation() }>
                <ProfileBox>
                    <UserProfile src={userImg}/>
                    <UserInfo>{session.userData.id}님 안녕하세용</UserInfo>
                    <BtnInProfile onClick={() => { 
                        navigate("/mypage");
                        dispatch(setMyPageModal(false));
                    }}>마이페이지</BtnInProfile>
                    <BtnInProfile onClick={() => {
                        navigate("/write");
                        dispatch(setMyPageModal(false));
                    }}>글쓰기</BtnInProfile>
                </ProfileBox>
                <form onSubmit={ logout }>
                    <LogoutBtn type="submit">로그아웃</LogoutBtn>
                </form>
            </ModalBox>
        </Background>
    );
}

export default MyPageModal;