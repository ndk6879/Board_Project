/* eslint-disable */

import Carousel from "../components/Carousel.js";
import PreviewPosts from "../components/PreviewPosts";

function MainPage() {
  return (
    <div>
      <Carousel/>
      <PreviewPosts category="forum"/>
      <PreviewPosts category="qna"/>
    </div>
  );
}

export default MainPage;