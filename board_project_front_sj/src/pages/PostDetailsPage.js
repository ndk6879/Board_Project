/* eslint-disable */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import PostContent from "../components/PostContent.js";
import Comment from "../components/Comment.js";
import AddComment from "../components/AddComment.js";
import CommentData from "../store/CommentData.js";  // 댓글 출력 테스트

function PostDetailsPage() {

    const {category, id} = useParams();
    const [post, setPost] = useState('');
    const [comments, setComments] = useState([]);
    const [updateState, setUpdateState] = useState();

    // 카테고리, 게시글 id에 맞는 데이터를 get 요청하는 함수
    const getPostData = () => {
        console.log(category, id);
        axios.get(`/${category}/${id}`).then(data => {
            setPost(data.data.data);
        })
    }

    // 댓글 데이터 get 요청 함수
    const getCommentsData = () => {
        axios.get(`/post/${id}/comments`).then(data => {
            console.log(data.data.comments);
            setComments(data.data.comments);
        })
    }

    // 페이지 들어올 때, 새로고침 할 때
    // 1) 게시글 id에 기반해서 게시글 데이터 get 요청을 하도록 함
    // 2) 페이지 맨 위로 올림
    useEffect(() => { 
        getPostData();
        window.scrollTo({ top : 0 });
        console.log("post:", post);
    }, []);

    // 새 댓글 작성시 댓글 목록 업데이트 위한 get 요청
    useEffect(() => { getCommentsData(); }, [updateState]);

    return (
        <div>
            <PostContent post={post}/>
            { comments && comments.map((data, i) => <Comment key={i} category={category} id={id} data={data} setUpdateState={setUpdateState}/>)   /* 댓글 개수만큼 나오도록 */}
            <AddComment category={category} id={id} setUpdateState={setUpdateState}/>
        </div>
    );
}

export default PostDetailsPage