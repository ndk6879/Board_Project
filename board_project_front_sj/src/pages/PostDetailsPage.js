/* eslint-disable */

import { useParams } from "react-router-dom";
import PostContent from "../components/PostContent.js";
import Comment from "../components/Comment.js";
import AddComment from "../components/AddComment.js";

function PostDetailsPage(props) {

    let {id} = useParams();
    let post = props.contents.find((data) => data.id == id);

    return (
        <div>
            <div style={{ textAlign : "left", padding : "7px", paddingLeft : "15px"}}>
                🏠Home &gt; Forum
            </div>
            {/*
            - 이거를...굳이 컴포넌트로까지..???나눠야할까
            - Forum인지 Q&A인지도 바꿔줘야함
            */}
            
            <PostContent post={post}/>
            <Comment/> {/* 댓글 개수만큼 나오도록 ?? */}
            <AddComment/>
        </div>
    );
}

export default PostDetailsPage