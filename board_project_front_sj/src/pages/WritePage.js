/* eslint-disable */

import styled from "styled-components";
import ContentBox from "../components/ContentBox.js";

let OutsideBox = styled.div`
    width : 95%;  // 나중에 px로 바꿀 것 (전체화면 기준)
    margin : 30px auto;
`

let Header = styled.div`
    margin : 15px 0px;  // 세로 가로 인가봐
    text-align : left;
    font-size : 25px;
    font-weight : bold;
`

function WritePage() {
  return (
    <OutsideBox>
        <Header>글쓰기</Header>
        <ContentBox/>
    </OutsideBox>
  )
}

export default WritePage;