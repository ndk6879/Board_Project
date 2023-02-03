/* eslint-disable */

import "../App.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

let OutsideBox = styled.div`
    width : 90vw;
    margin : auto;
    margin-bottom : 40px;  // 이거 없으면 Q&A랑 더보기랑 겹친다???
`

let CategoryTitle = styled.div`
    width : 100%;
    margin : auto;
    padding : 10px;
    text-align : left;
    font-size : x-large;
`

let ListOfPosts = styled.table`
    width : 100%;
    margin : auto;
    border : 1px solid black;
    // 모서리 둥글게 근데 배경색 채우니까 쫌 이상함
    border-collapse : collapse;
    border-radius : 5px;
    border-style : hidden;
    box-shadow : 0 0 0 1px #000;  // 뭔뜻일까
`

let ColumnTitle = styled.tr`
    border : 1px solid black;
    background-color : powderblue;
    height : 35px;
`

let PostInfo = styled.tr`
    border : 1px solid lightgray;
    font-size : 15px;
    height : 30px;
`

let TitleInfo = styled.td`
    padding-left : 15px;  // margin으로 하면 안먹힘
    width : 65%;  // 이렇게 말고,,
`

let Title = styled.div`
    text-align : left;
    float : left;
    margin-right : 10px;  // 제목 ~ 댓글수 간격 두기

    // 제목이 긴 경우
    overflow : hidden;  // 글자 자르기
    white-space : nowrap;  // 줄바꿈 방지
    text-overflow : ellipsis;  // 말줄임표(...) 표시
    max-width : 260px;  // 최대 길이 지정 :: %로 하고싶음.. +) 얘 없어도 잘 되던데 난 안 됨 ㅠ
`

let Comment = styled.div`
    float : left;
`

let MoreBtn = styled.button`
    float : right;
    margin : 10px;
    padding : 3px;
    padding-left : 7px;
    padding-right : 7px;
    font-size : 14px;
    background-color : powderblue;
    border : thin solid black;
    border-radius: 5px;
`

function PreviewPosts(props) {
        
    let copyForShowContents = [...props.contents.slice(-5, )].reverse();  { /*최근 5개, 최신순으로 */}
    let navigate = useNavigate();

    return(

        <OutsideBox>

            <CategoryTitle>{props.categoryTitle}</CategoryTitle>
            <ListOfPosts>
                <thead>
                    <ColumnTitle>
                        <th style={{ width : "60%" }}>글제목</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </ColumnTitle>
                </thead>
                <tbody>
                    {
                        copyForShowContents.map((data, i) => {
                            return (
                                <PostInfo key={i}>
                                    <TitleInfo>
                                        <Title onClick={(e) => {
                                            let content = props.contents.find((data) => data.title == e.target.innerText);
                                            navigate(`/${props.category}/${content.id}`);
                                            {/*
                                            - e가 필요해서 Link 안 쓰고 그냥 onClick으로 해놓음
                                            - 마우스 갖다대도 손가락으로 안 바뀜..바꿀거야
                                            */}
                                        }}>{data.title}</Title>
                                        <Comment>[{data.comments}]</Comment>
                                    </TitleInfo>
                                    <td>{data.hits}</td>
                                    <td>{data.date}</td>
                                </PostInfo>
                            )
                        })
                    }
                </tbody>
            </ListOfPosts>
            <MoreBtn>더보기</MoreBtn>

        </OutsideBox>
    );
}

export default PreviewPosts;