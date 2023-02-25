/* eslint-disable */

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PostContent from "../components/PostContent.js";
import Comment from "../components/Comment.js";
import AddComment from "../components/AddComment.js";
import CommentData from "../store/CommentData.js";  // 댓글 출력 테스트

function PostDetailsPage(props) {

    // 카테고리에 맞게 데이터 가지고 오기
    // 근데 여기서 가지고 오면 주소창에 /forum/00 입력해서 들어가는거 안됨
    let contents = (props.category == "forum"
                    ? useSelector((state) => state.postData.forum)
                    : useSelector((state) => state.postData.qna));

    let {id} = useParams();
    let post = contents.find((data) => data._id == id);

    // 페이지 들어올 때, 새로고침 할 때 맨 위로 올림
    useEffect(() => { window.scrollTo({ top : 0 })}, []);

    return (
        <div>
            <PostContent post={post} category={props.category}/>
            { CommentData.map((data, i) => <Comment key={i} data={data}/>)   /* 댓글 개수만큼 나오도록 */}
            <AddComment/>
        </div>
    );
}

export default PostDetailsPage