/* eslint-disable */

import styled from "styled-components";

import PostList from "../components/PostList.js";
import BottomItems from "../components/BottomItems.js"

let ContainerBox = styled.div`
    width : 95%;  // 나중에 px로 바꿀 것 (전체화면 기준)
    //height : 780px;  // 없어도 될 듯
    margin : 30px auto;
`

let Header = styled.div`
    margin : 15px 0px;  // 세로 가로 인가봐
    text-align : left;
    font-size : 30px;
`

function PostListPage(props) {

    let categoryTitle = (props.category == "forum" ? "Forum" : "Q&A");

    return (
        <ContainerBox>
            <Header>{categoryTitle}</Header>
            <PostList category={props.category}></PostList>
            <BottomItems/>
        </ContainerBox>
    )
}

export default PostListPage;