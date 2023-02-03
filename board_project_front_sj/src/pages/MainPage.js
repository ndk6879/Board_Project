/* eslint-disable */

//import 'bootstrap/dist/css/bootstrap.css';  // 뭔데 갑자기 얘가 필요하지
import Carousel from "../components/Carousel.js";
import PreviewPosts from "../components/PreviewPosts";
import ForumData from "../store/ForumData.js";
import QnaData from "../store/QnaData.js";

function MainPage() {
  return (
    <div>

      <div>내가 만들었당</div>
      <Carousel/>
      <PreviewPosts categoryTitle="Forum" category="forum" contents={ForumData}/>
      <PreviewPosts categoryTitle="Q&A" category="qna" contents={QnaData}/>

    </div>
  );
}

export default MainPage;