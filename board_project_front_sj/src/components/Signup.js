/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import openEyeImg from "../img/open_eye.png";
import closedEyeImg from "../img/closed_eye.png";

let OutsideBox = styled.div`
    width : 400px;
    height : 570px;
    border : 1px solid #E7E7E7;
    background-color : #FEFDFC;
    margin : auto;
`

let Header = styled.div`
    width : 300px;
    height : 30px;
    margin : 20px auto;
    padding : 10px;
    font-size : 17px;
    border-bottom : 1px solid #e7e7e7;
`

// id, pw 입력
let SignupData = styled.div`
    width : 300px;
    height : 300px;
    margin : auto;
    margin-top : 50px;
`
// 제목 (아이디, 비밀번호, 비밀번호 확인)
let Category = styled.div`
    height : 70px;
`

let CategoryTitle = styled.div`
    height : 20px;
    font-size : 15px;
    text-align : left;
    margin-top : 25px;
`

// Input + Button
let InputBox = styled.div`
    width : 300px;
    height : 33px;
    //border : 1px solid red;
    border-bottom : 1px solid gray;
`

let InputSignupData = styled.input`
    width : 250px;
    height : 25px;
    float : left;
    border : 0px;
    margin-top : 5px;  // 바닥에 붙이려고
    outline : none;  // 포커스 시에도 테두리 보이지 않도록
`

let CheckData = styled.div`
    margin-top : 3px;
    float: left;
    text-align: left;
    font-size : 12px;
    color : tomato;
`

let CheckPwBtn = styled.div`
    float : right;
    cursor : pointer;
`

let Img = styled.img`
    height : 23px;
    margin-top : 8px;
    margin-right : 3px;
    //border : 1px solid darkblue;
`

let ButtonBox = styled.div`
    width : 300px;
    height : 30px;
    margin : auto;
`

let SignupBtn = styled.button`
    float : right;
    width : 80px;
    height : 28px;
    font-size : 15px;
    line-height : 27px;
    background-color : powderblue;
    border : thin solid black;
    border-radius : 3px;
    cursor : pointer;
    &:hover{
        background-color : cadetblue;
        color : white;
    }
`

function Signup() {

    let [userData, setUserData] = useState('');

    let [inputId, setInputId] = useState('');
    let [inputPw, setInputPw] = useState('');
    let [reInputPw, setReInputPw] = useState('');

    // 아이디 체크하는데 state 너무 많이 쓰나
    let [checkId, setCheckId] = useState('');
    let [checkPw, setCheckPw] = useState('');
    let [isAvailableId, setIsAvailableId] = useState(false);

    let navigate = useNavigate();

    //아이디 중복 여부 확인 멘트
    useEffect(() => {
        // 서버에서 유저데이터 가지고 오기
        // copy 뭔가 이상해보이기도.. 이렇게 하는거 맞았을까
        axios.get("/list/user").then(data => {
            let copiedUserData = [...userData];
            copiedUserData = data.data;
            setUserData(copiedUserData);
        })

        // 사용 가능한 아이디인지 확인
        if (!inputId) {
            setCheckId("아이디를 입력하세요");
            setIsAvailableId(false);
        }
        else {
            let flag = false;
            userData.map(data => {
                if (inputId == data.id) flag = true;
            })
            if (flag) {
                setCheckId("이미 있음!");
                setIsAvailableId(false);
            }
            else {
                setCheckId("사용 가능한 아이디");
                setIsAvailableId(true);
            }
        }
    }, [inputId]);

    // 비밀번호 확인 멘트
    useEffect(() => {
        if (!inputPw || !reInputPw) setCheckPw('');
        else if (inputPw != reInputPw) setCheckPw("다름");
        else setCheckPw("같음!");
    }, [inputPw, reInputPw]);

    // 눈 모양 아이콘 누르면 2초동안 입력한 비밀번호 보여줌
    let [hidePw1, setHidePw1] = useState(true);
    let [hidePw2, setHidePw2] = useState(true);
    let checkPw1 = () => {
        setHidePw1(false)
        setTimeout(() => setHidePw1(true), 2000)
    }
    let checkPw2 = () => {
        setHidePw2(false)
        setTimeout(() => setHidePw2(true), 2000)
    }

    /*
    회원가입 함수
    - 입력한 ID, PW를 서버로 보냄
    - 회원가입 성공 시 성공 메세지 보여준 후 메인 페이지로 이동
    - 회원가입을 시도하지 않는 경우
        - 이미 존재하는 ID (프론트에서 아이디 중복 검사)
        - ID, PW, PW확인 중 하나라도 입력되지 않았을 때
        - PW와 PW확인 값이 다를 때
    */
    let trySignup = (e) => {
        e.preventDefault();

        // 서버에 보낼 ID, PW
        let body = {
            id : inputId,
            pw : inputPw
        };

        console.log(body);

        // return vs else
        if (!inputId) alert("ID를 입력하세요.");
        else if (!isAvailableId) alert("이미 존재하는 ID입니다.");
        else if (!inputPw) alert("PW를 입력하세요.");
        else if (!reInputPw) alert("PW를 다시 입력하세요.");
        else if (inputPw != reInputPw) alert("PW를 확인하세요.");
        else {
            // 회원가입 완료!가 오는듯 근데 왜 response.data.message가 아니지
            axios.post("/signup", body)
            .then(response => {
                console.log("response.data:", response.data);
                if (response.data.message == "OK") {
                    alert("회원가입 성공~");
                    navigate("/");
                }
                else alert("회원가입 실패");
            }).catch(err => {
                console.log("trySignup 함수 에러");
                console.log(err);
            })
        }
    }

    return (
        <OutsideBox>
            <Header>반가와용~</Header>
            <form onSubmit={ trySignup }>
                <SignupData>
                    <Category>
                        <CategoryTitle>아이디</CategoryTitle>
                        <InputBox>
                            <InputSignupData onChange={ e => setInputId(e.target.value) }/>
                        </InputBox>
                        <CheckData>{ checkId }</CheckData>
                    </Category>
                    <Category>
                        <CategoryTitle>비밀번호</CategoryTitle>
                        <InputBox>
                            <InputSignupData
                            type={hidePw1 ? "password" : "text"}
                            onChange={e => { setInputPw(e.target.value); }}
                            />
                            <CheckPwBtn onClick={ checkPw1 }>
                                <Img src={hidePw1 ? openEyeImg : closedEyeImg}/>
                            </CheckPwBtn>
                        </InputBox>
                    </Category>
                    <Category>
                        <CategoryTitle>비밀번호 확인</CategoryTitle>
                        <InputBox>
                            <CheckPwBtn onClick={ checkPw2 }>
                                <Img src={hidePw2 ? openEyeImg : closedEyeImg}/>
                            </CheckPwBtn>
                            <InputSignupData
                            type={hidePw2 ? "password" : "text"}
                            onChange={e => {setReInputPw(e.target.value); }}
                            />
                        </InputBox>
                        <CheckData>{ checkPw }</CheckData>
                    </Category>
                </SignupData>
                <ButtonBox>
                    <SignupBtn type="submit">회원가입</SignupBtn>
                </ButtonBox>
            </form>
        </OutsideBox>
    );
}

export default Signup;