/* eslint-disable */

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

import modifyImg from '../img/edit.png';
import deleteImg from '../img/recycle-bin.png';
import userImg from "../img/user.png";

const OutsideBox = styled.div`
    //border : 1px solid pink;
    width : 90%;
    height : fit-content;
    margin : 20px auto;
    display : flex;
`

const UserImg = styled.img`
    height : 50px;
    float : left;
    padding : 12px;
    flex : 0;
`

const CommentInfo = styled.div`
    float : left;
    flex : auto;
`

const Writer = styled.div`
    //border: 1px solid pink;
    height: 27px;
    text-align : left;
    padding : 0px 10px;
    float : left;
    font-size : 17.5px;
`

const Date = styled.div`
    //border: 1px solid brown;
    height : 20px;
    padding : 0px 10px;
    margin-top : 4px;
    float : left;
    font-size : 13px;
`

const LikeButton = styled.div`
    font-size : 13px;
    height : 20px;
    margin-top : 4px;
    float : left;
    cursor : pointer;
`

const LikeInfo = styled.div`
    font-size : 13px;
    margin : 0px 2px;
    margin-top : 4px;
    float : left;
`

const BtnImg = styled.button`
    float : right;
    margin : 0px 3px;
    margin-top : 0.5px;
    padding-top : 4px;
    border : 0px solid violet;
    background-color : white;
    border-radius: 3px;
    cursor : pointer;
    &:hover{
        background-color: lightgray;
        color: white;
    }
`

const Img = styled.img`
    height : 15px;
`

const Content = styled.div`
    //border : 1px solid pink;
    clear : left;  // float 속성 적용한 객체 다음에 오는 객체가 붙지 않도록
    margin-right : 7px;
    padding : 10px;
    text-align : left;
    height : fit-content;
    font-size : 15px;
    line-height : 150%;  // 줄간격 조정
    white-space : pre-wrap;  // 텍스트 공백, 줄바꿈 처리
`

function ShowComment(props) {

    const [like, setLike] = useState(0);
    const [showBtn, setShowBtn] = useState(false);
    const session = useSelector((state) => state.session);
    
    // 서버에서 게시글 데이터 가져오기
    // 댓글 작성 후 변경사항 바로 반영되도록
    const pullData = () => {
      axios.get("/forum").then(data => {
        let copiedForumData = [...forumData];
        copiedForumData = data.data.data;
        dispatch(setForumData(copiedForumData));
      })
      axios.get("/qna").then(data => {
        let copiedQnaData = [...qnaData];
        copiedQnaData = data.data.data;
        dispatch(setQnaData(copiedQnaData));
      })
    }

    // 로그인했을 때만 누를 수 있어야 함
    // 누르지 않았음 -> 좋아요 +1
    // 이미 누른 게시글 -> 좋아요 -1
    const changeLike = () => {
        // 로그인 안 했으면 로그인 먼저
        if (!session.isLoggedIn) {
            dispatch(setLoginModal(true));
            window.scrollTo({ top: 0, behavior : "smooth" });
            return alert("로그인 안 하셨는데요?");
        }
        console.log("like:", like);
        // 아직 누르지 않은 사람이면 -> 목록에 추가하고 좋아요+1
        // 이미 누른 사람이면 -> 목록에서 빼고 좋아요-1
        // 변경사항이 바로 반영되려면 다시 get요청을 해야 함
    }

    // 댓글 삭제 함수
    const deleteComment = () => {
        console.log("delete!");      
        if (window.confirm("삭제?")) {
            console.log("삭제해야겠다");
            axios.delete(`/comment/${props.data._id}`)
            .then(response => {
                console.log(response);
                // response.data.message :: 댓글 삭제 성공했을 때 OK 옴
                if (response.data.message == "OK") {
                    alert("댓글 삭제가 완료되었습니다.");
                    props.setUpdateState({});  // 새로운 댓글이 바로 반영되도록
                    pullData();  // 목록 댓글 개수
                }
            }).catch(err => {
                console.log("deleteComment 함수 에러");
                console.log(err);
            });
        }
        else console.log("삭제X");
    }

    // 로그인한 유저가 쓴 댓글에서만 수정, 삭제 버튼을 보이기 위한 기능
    // 유저 정보 확인 -> showBtn 값 바꿔줌
    // id로 비교 -> _id로 비교하는 것으로 바꿔야 함
    useEffect(() => {
        if (session.userData.id == props.data.author) setShowBtn(true);
        else setShowBtn(false);
    })

    return (
        <>
            <OutsideBox>
                <UserImg src={userImg}/>
                <CommentInfo>
                    <Writer>{props.data.author}</Writer>
                    <Date>{props.data.time}</Date>
                    <LikeButton onClick={ changeLike }>❤️</LikeButton>
                    <LikeInfo> {like} </LikeInfo>
                    {showBtn && <BtnImg onClick={ deleteComment }> <Img src={deleteImg}/> </BtnImg>}
                    {showBtn && <BtnImg onClick={ () => props.setShowComment(false) }> <Img src={modifyImg}/> </BtnImg>}
                    <Content>{props.data.comment}</Content>
                </CommentInfo>
            </OutsideBox>
        </>
    )
}

export default ShowComment;