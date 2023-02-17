/* eslint-disable */

import "../App.css"

import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../logo.svg";
import LoginModal from "./LoginModal.js";
import MyPageModal from "./MyPageModal.js";

let Background = styled.div`
    background-color : powderblue;
    width : 100vw;
    height : 50px;
`

// 로고 이미지 + 로고 글씨
let Logo = styled.div`
    height : 50px;
    float : left;
    padding-left : 3%;
    font-size : 20px;
    display : flex;  // 텍스트를
    align-items : center;  // 가운데로
    //display : inline-block;
`

let LogoImg = styled.img`
    width : 50px;
    height : 50px;
`

// Login / Sign up
let LoginModalBtn = styled.div`
    height : 50px;
    float : right;
    padding-right : 3%;
    display : flex;
    align-items : center;
    //line-height : 50px;  // 줄 너비 = div height, 근데 이거 한 줄짜리만 될 듯
    font-size : 17px;
`

function Navbar() {

    let [loginModal, setLoginModal] = useState(false);
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [myPageModal, setMyPageModal] = useState(false);
    let navigate = useNavigate();

    return (
        <div>

            <Background>
                
                <Link to="/" className="link-style">
                    <Logo><LogoImg src={logo}/>Navbar</Logo>
                </Link>
                {/* <Logo onClick={() => {navigate("/")}}><LogoImg src={logo}/>Navbar</Logo>
                    -> 이런 식으로는? div에 navigate 써도 되나 */}
                {
                    !isLoggedIn
                    ? <LoginModalBtn onClick={() => { setLoginModal(!loginModal) }}>Login / Sign up</LoginModalBtn>
                    : <LoginModalBtn onClick={() => { setMyPageModal(!myPageModal)}}>My Page / Logout</LoginModalBtn>
                }
                
            </Background>
            <div style={{ position : "relative" }}>
                { loginModal && <LoginModal setIsLoggedIn={setIsLoggedIn} setLoginModal={setLoginModal}/> }
                { myPageModal && <MyPageModal setIsLoggedIn={setIsLoggedIn} setMyPageModal={setMyPageModal}/> }
            </div>
            
        </div>
    );
}

export default Navbar