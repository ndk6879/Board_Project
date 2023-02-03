/* eslint-disable */

import styled from "styled-components";
import { useEffect, useState } from "react";
// 이미지 경로 src에 직접 입력했을 떄는 엑박 뜸
import car1 from "../img/car1.png";
import car2 from "../img/car2.png";
import car3 from "../img/car3.png";


let OutsideBox = styled.div`
    width: 100vw;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
`

let SlideContainer = styled.div`
    width: ${props => props.numOfImgs * 100}vw;
    transition: all 1s;
    transform: ${props => "translateX(" + props.curImgNum * (-100) + "vw)"};
`

let ImgContainer = styled.div`
    width: 100vw;
    float: left;
    z-index: 50;
`

// 이미지 좌우 이동 버튼
let Btn = styled.button`
    // 위치
    top: 43%;
    z-index: 100;  // 없으니까 왼쪽 버튼 안 보임
    position: absolute;

    // 예쁘게 하고싶어서
    border: none;
    font-weight: bold;
    border-radius: 5px;
    padding: 8px;
    opacity: 0.8;

    // 마우스 대면 효과 생기게
    &:hover{
        background-color: darkgrey;
        color: white;
    }
`

let PrevBtn = styled(Btn)`
    left: 3vw;
`

let NextBtn = styled(Btn)`
    right: 3vw;
`

let SlideDot = styled.div`
    text-align: center;
`

function Carousel() {

    const TOTAL_IMG_NUM = 3;
    let [curImgNum, setCurImgNum] = useState(0);

    const clickPrev = () => {
        if (curImgNum == 0) setCurImgNum(TOTAL_IMG_NUM - 1);
        else setCurImgNum(curImgNum-1);
    };

    const clickNext = () => {
        if (curImgNum + 1 == TOTAL_IMG_NUM) setCurImgNum(0);
        else setCurImgNum(curImgNum+1);
    };

    // useEffect(() =>  {
    //     let timer = setTimeout(clickNext, 5000);
    //     return (() => clearTimeout(timer));
    // })

    return (
        <OutsideBox>
            <PrevBtn onClick={clickPrev}>&lt;</PrevBtn>
            <SlideContainer numOfImgs="3" curImgNum={curImgNum}>
                <ImgContainer><img src={car1} style={ {width: "100vw"} }/></ImgContainer>
                <ImgContainer><img src={car2} style={ {width: "100vw"} }/></ImgContainer>
                <ImgContainer><img src={car3} style={ {width: "100vw"} }/></ImgContainer>
            </SlideContainer>
            <NextBtn onClick={clickNext}>&gt;</NextBtn>
        </OutsideBox>
    );
}

export default Carousel;