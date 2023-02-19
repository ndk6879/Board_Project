/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

let OutsideBox = styled.div`
    width : 95%;
    height : 780px;
    border : 1px solid black;
    margin : auto;
    margin-top : 10px;
`

function PostListPage(props) {

    let [realData, setRealData] = useState([]);
    let pullData = () => {
        axios.get("/list/post").then(data => {
            let copy = [...realData];
            copy = data.data
            setRealData(copy);
        }).catch(() => { console.log("게시글 데이터 가져오기 실패") });
    }

    // 페이지 mount시 1회 게시글 가져오는 기능
    useEffect(() => { pullData(); }, [])

    return (
        <OutsideBox>
            <div>게시글 목록</div>
            {realData.map((data, i) => <div key={i}>{data.title}</div> )}
        </OutsideBox>
    )
}

export default PostListPage;