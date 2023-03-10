// Redux 사용을 위한 설정
// npm install @reduxjs/toolkit react-redux

/* eslint-disable */
import { configureStore, createSlice } from "@reduxjs/toolkit"


// 로그인에 필요한 state들 (로그인 상태, 유저 정보)
let session = createSlice({
  name : "session",
  initialState : {
    isLoggedIn : false,
    userData : { _id : '', id : '', pw : '' }
  },
  reducers : {
    setIsLoggedIn(state, action) { state.isLoggedIn = action.payload; },
    setUserData(state, action) { state.userData = action.payload; }
  }
})

// 로그인, 마이페이지 모달 상태를 결정하는 state들
let modalState = createSlice({
  name : "modalState",
  initialState : { login : false, mypage : false },
  reducers : {
    setLoginModal(state, action) { state.login = action.payload },
    setMyPageModal(state, action) { state.mypage = action.payload }
  }
})

// 서버에서 가져오는 게시글 데이터 저장
let postData = createSlice({
  name : "postData",
  initialState : { forum : [], qna : [] },
  reducers: {
    setForumData(state, action) { state.forum = action.payload },
    setQnaData(state, action) { state.qna = action.payload }
  }
})





// 바깥에서 사용할 수 있도록 export
export default configureStore({
  reducer: {
    session : session.reducer,
    modalState : modalState.reducer,
    postData : postData.reducer
  }
})

export let { setIsLoggedIn, setUserData } = session.actions;
export let { setLoginModal, setMyPageModal } = modalState.actions;
export let { setForumData, setQnaData } = postData.actions;