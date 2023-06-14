/* eslint-disable */

import { useState } from "react";

import ShowComment from './ShowComment';
import ModifyComment from './ModifyComment';


function Comment(props) {
    let [showComment, setShowComment] = useState(true);

    return (
        <>
            {showComment && <ShowComment category={props.category} id={props.id} data={props.data} setShowComment={setShowComment} setUpdateState={props.setUpdateState}/>}
            {!showComment && <ModifyComment data={props.data} setShowComment={setShowComment} setUpdateState={props.setUpdateState}/>}
            <hr style={{ width : "90%" }}/>
        </>
    );
}

export default Comment;