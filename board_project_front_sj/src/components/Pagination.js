/* eslint-disable */

import { useEffect } from "react";
import styled from 'styled-components';

let OutsideBox = styled.div`
    //border : 1px solid blue;
`

let PageNumBox = styled.div`
  margin-top : 35px;
  display : flex;
  align-items : center;  // 자식 요소의 세로 정렬
  justify-content : center;  // 자식 요소의 가로 정렬
`

let TurnPageBtn = styled.div`
  font-size : 15px;
  font-weight : ${(props) => (props.isNow ? 600 : 400)};
  border : 0px;
  background-color: white;
  margin : 7px;
  cursor : pointer;
`


function Pagination({total, limit, curPage, setCurPage}) {
    
    let totalPageNum = Math.ceil(total / limit);

    // 한 페이지에 보여줄 게시글 수 바뀌면 첫 페이지로 이동
    useEffect(() => { setCurPage(1); }, [limit])
    
    return (
        <OutsideBox>
            <PageNumBox>
                <TurnPageBtn
                    onClick={() => {
                        if (curPage != 1) setCurPage(curPage - 1);
                        else alert("첫 번째 페이지입니다.");
                    }}
                >&lt;이전</TurnPageBtn>
                {
                    Array(totalPageNum).fill().map((_, i) => (
                        <TurnPageBtn
                            key={i + 1}
                            onClick={ () => setCurPage(i + 1) }
                            isNow={curPage == i + 1 ? true : false}
                        >{i + 1}</TurnPageBtn>
                    )
                    )
                }
                <TurnPageBtn
                    onClick={() => {
                        if (curPage < totalPageNum) setCurPage(curPage + 1);
                        else alert("마지막 페이지입니다.");
                    }}
                >다음&gt;</TurnPageBtn>
            </PageNumBox>
        </OutsideBox>
    )
}

export default Pagination;