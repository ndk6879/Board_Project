/* eslint-disable */

import "../App.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

let ContainerBox = styled.div`
    width : 90vw;
    margin : auto;
    margin-bottom : 40px;
`

let Header = styled.div`
    width : 100%;
    margin : auto;
    margin-bottom : 8px;
    display : flex;
    align-items : center;  // 자식 요소의 세로 정렬
    justify-content : flex-start;  // 자식 요소의 가로 정렬
`

let CategoryTitle = styled.div`
    margin-left : 3px;
    margin-right : auto;  // 더보기 버튼 오른쪽에 붙이기
    text-align : left;  // 글 왼쪽 정렬
    font-size : 23px;
    cursor : pointer;
    //border : 1px solid indianred;
    // 마우스 대면 효과 생기게 :: 밑줄 효과 넣자
    &:hover{
        font-weight : 600;
        text-decoration : underline;
    }
`

// let MoreBtn = styled.button`
//     width : 60px;
//     height : 28px;
//     font-size : 14px;
//     background-color : powderblue;
//     border : thin solid black;
//     border-radius: 5px;
//     cursor : pointer;  // 마우스 가져갔을 때 손가락 모양으로
//     // 마우스 대면 효과 생기게
//     &:hover{
//         background-color: cadetblue;
//         color: white;
//     }
// `

let ListOfPosts = styled.table`
    width : 100%;
    margin : auto;
    border : 1px solid black;
    // 모서리 둥글게
    border-collapse : collapse;
    border-radius : 5px;
    border-style : hidden;
    box-shadow : 0 0 0 1px #000;  // 뭔뜻일까
`

// let ColumnTitle = styled.tr`
//     border : 1px solid black;
//     background-color : powderblue;
//     height : 35px;
// `

let PostInfo = styled.tr`
    border : 1px solid lightgray;
    font-size : 15px;
    height : 30px;
`

let TitleInfo = styled.td`
    padding : 8px 15px;
    width : 80%;  // 이렇게 말고,,
`

let Title = styled.div`
    text-align : left;
    float : left;
    margin-right : 10px;  // 제목 ~ 댓글수 간격 두기
    cursor : pointer;  // 마우스 가져갔을 때 손가락 모양으로

    // 제목이 긴 경우
    overflow : hidden;  // 글자 자르기
    white-space : nowrap;  // 줄바꿈 방지
    text-overflow : ellipsis;  // 말줄임표(...) 표시
    max-width : 260px;  // 최대 길이 지정 :: %로 하고싶음.. +) 얘 없어도 잘 되던데 난 안 됨 ㅠ

    &:hover{
        text-decoration : underline;
    }
`

let Comment = styled.div`
    float : left;
`

function PreviewPosts(props) {

    let categoryTitle = (props.category == "forum" ? "Forum" : "Q&A");
    let contents = (props.category == "forum"
                    ? useSelector((state) => state.postData.forum)
                    : useSelector((state) => state.postData.qna));

    let copyForShowContents = [...contents.slice(-5, )].reverse();  { /*최근 5개, 최신순으로 */}
    let navigate = useNavigate();

    return(

        <ContainerBox>

            <Header>
                <CategoryTitle
                 onClick={() => { navigate(`/${props.category}`)}}>
                    {categoryTitle}
                </CategoryTitle>
            </Header>
            <ListOfPosts>
                <tbody>
                    {
                        copyForShowContents.map((data, i) => {
                            return (
                                <PostInfo key={i}>
                                    <TitleInfo>
                                        <Title onClick={(e) => {
                                            navigate(`/${props.category}/${data._id}`);
                                            {/* e가 필요해서 Link 안 쓰고 그냥 onClick으로 해놓음 ...이게 먼말이더라 */}
                                        }}>{data.title}</Title>
                                        <Comment>[{data.comment}]</Comment>
                                    </TitleInfo>
                                    {/* <td>{data.hits}</td> */}
                                    <td style={{ marginLeft : "auto", marginRight : "auto" }}>{data.date}</td>
                                </PostInfo>
                            )
                        })
                    }
                </tbody>
            </ListOfPosts>

        </ContainerBox>
    );
}

export default PreviewPosts;