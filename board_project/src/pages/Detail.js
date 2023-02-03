import { useParams } from "react-router";

function Detail() {

    let {id} = useParams();
    console.log(id);
    
    return (
        <div className = "detail">
            디테일 페이지 모듈화시킴 ㅅㄱ. 
        </div> 
    )
}


export default Detail;