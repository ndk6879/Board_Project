/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

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
    입력된 데이터를 서버로 보내는 함수
    - 입력된 ID, PW가 DB의 유저 정보와 같은 경우에만 로그인 허용하기 위해
    - ID, PW가 입력되지 않았다면 로그인을 시도하지 않음
    - ID, PW 조건이 추가된다면 충족하는 경우에만 로그인을 시도하도록 수정할 예정
    */
    let tryLogin = (e) => {
        e.preventDefault();

        let body = {
            id : inputId,
            pw : inputPw
        };

        if (!inputId) return alert("ID를 입력하세요.");
        else if (!inputPw) return alert("PW를 입력하세요.");

        axios.post("/login", body)
        .then(response => {
            console.log("성공!");
            console.log(('data:' + JSON.stringify(body)));
            console.log(response.data);
        }).catch((res) => { 
            console.log("에러;;;");
            console.log("wrong data:" + JSON.stringify(body));
            console.log('res:', res);

        });
    }

    return (
        <Background onClick={() => { props.setLoginModal(false) }}>
            <ModalBox onClick={e => { e.stopPropagation() }}>
                <form onSubmit={ tryLogin }>
                    <InputLoginData
                    placeholder="아이디"
                    name="id"
                    onChange={e => { setInputId(e.target.value); }}
                    />
                    <InputLoginData
                    placeholder="비밀번호"
                    name="pw"
                    type="password"
                    onChange={e => { setInputPw(e.target.value); }}
                    />
                    <div style={{fontSize : "13px",}}>아이디 저장 / 자동 로그인 만들어야지</div>
                    <LoginBtn type="submit">로그인!</LoginBtn>
                </form>
                <div style={{ display : "inline-block", verticalAlign : "middle" }}>
                    <LoginMenu>회원가입</LoginMenu>
                    <LoginMenu>ID찾기</LoginMenu>
                    <LoginMenu>PW찾기</LoginMenu>
                </div>
            </ModalBox>
        </Background>
    );
}

export default LoginModal;