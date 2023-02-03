/* eslint-disable */

import styled from "styled-components";

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
    return (
        <Background onClick={() => { props.setLoginModal(false) }}>
            <LoginBox onClick={(e) => { e.stopPropagation() }}>
                로그인하자~~
                <InputLoginData placeholder = "아이디"></InputLoginData>
                <InputLoginData placeholder = "비밀번호"></InputLoginData>
                <LoginBtn>로그인!</LoginBtn>
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