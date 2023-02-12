/* eslint-disable */

import styled from "styled-components";
import { useState } from "react";
import LoginData from "../store/LoginData.js";

let Background = styled.div`
    position : absolute;
    width : 100vw;
    height : 100vh;
    background-color : none;
    z-index : 150;  // 캐러셀 버튼 z-index가 100임
`

let LoginBox = styled.div`
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

// ID, PW 입력창
let InputLoginData = styled.input`
    width : 270px;
    height : 32px;
    margin : 3px;
`

let LoginBtn = styled.button`
    background-color : powderblue;
    width : 270px;
    height : 35px;
    border : 0px;
    border-radius : 5px;
    margin : 5px;
`

// 회원가입, ID찾기, PW찾기
let LoginMenu = styled.div`
    font-size : 13px;
    margin : 7px;
    padding-left : 7px;
    padding-right : 7px;
    display : inline-block;
`

function LoginModal(props) {

    let [inputId, setInputId] = useState('');
    let [inputPw, setInputPw] = useState('');

    /*
    로그인 버튼을 눌렀을 때 입력받은 ID, PW가
    회원가입 되어있는 유저의 ID, PW와 일치하는지 확인하는 함수
    - 일치하면 로그인
    - 일치하지 않으면 경고창 띄우기
    */
    let checkUserData = () => {
        let isFound = false;
        LoginData.map(data => {
            if (inputId == data.id) {
                if (inputPw == data.pw) {
                    isFound = true;
                    props.setIsLoggedIn(true);
                    props.setLoginModal(false);
                }
                else console.log("아이디 찾았는데 비밀번호 틀림");
            }
        })
        if (!isFound) alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    return (
        <Background onClick={() => { props.setLoginModal(false) }}>
            <LoginBox onClick={e => { e.stopPropagation() }}>
                로그인하자~~
                <InputLoginData
                placeholder = "아이디"
                onChange={e => { setInputId(e.target.value); }}
                />
                <InputLoginData
                placeholder = "비밀번호"
                type="password"
                onChange={e => { setInputPw(e.target.value); }}
                onKeyDown={e => { e.key == "Enter" && checkUserData() }}
                />
                <LoginBtn onClick={ checkUserData }>로그인!</LoginBtn>
                <div style={{ display : "inline-block", verticalAlign : "middle" }}>
                    <LoginMenu>회원가입</LoginMenu>
                    <LoginMenu>ID찾기</LoginMenu>
                    <LoginMenu>PW찾기</LoginMenu>
                </div>
            </LoginBox>
        </Background>
    );
}

export default LoginModal;