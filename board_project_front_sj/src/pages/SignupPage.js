/* eslint-disable */

import styled from "styled-components";
import Signup from "../components/Signup.js";

let Header = styled.div`
    height : 70px;
    margin-bottom : 50px;
    background-color : whitesmoke;
    display : flex;
    align-items : center;
`

let CategoryInfo = styled.div`
    font-size : 23px;
    text-align : left;
    margin : auto 35px;
`

function SignupPage() {
    return (
        <>
            <Header>
                <CategoryInfo>회원가입</CategoryInfo>
            </Header>
            <Signup/>
        </>
    );
}

export default SignupPage;