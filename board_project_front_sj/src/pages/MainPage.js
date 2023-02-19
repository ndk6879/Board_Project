/* eslint-disable */

import Carousel from "../components/Carousel.js";
import PreviewPosts from "../components/PreviewPosts";

function MainPage(props) {
  return (
    <div>
      <Carousel/>
      <PreviewPosts categoryTitle="Forum" category="forum" contents={props.forumData}/>
      <PreviewPosts categoryTitle="Q&A" category="qna" contents={props.qnaData}/>
    </div>
  );
}

export default MainPage;