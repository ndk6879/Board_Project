/* eslint-disable */

import styled from "styled-components";

let OutsideBox = styled.div`
    width : 90%;
    height : fit-content;
    margin : auto;
    margin-top : 20px;
    margin-bottom : 20px;
`

let Writer = styled.div`
    width : fit-content;
    text-align : left;
    padding-left : 10px;
    float : left;
`

let Date = styled.div`
    width : 20px;
    padding-left : 15px;
    float : left;
    font-size : 13px;
`

let Content = styled.div`
    clear : left;
    padding : 12px;
    text-align : left;
    padding-left : 10px;
    height : fit-content;
    white-space : pre-line;
`

function Comment(props) {
    return (
        <>
            <OutsideBox>
                <div style={{ position : "relative"}}>
                    <Writer>{props.data.author}</Writer>
                    <Date>{props.data.time}</Date>
                </div>
                <Content>{props.data.comment}</Content>
            </OutsideBox>
            <hr style={{ width : "90%" }}/>
        </>
    );
}

export default Comment;