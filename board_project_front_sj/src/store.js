// Redux 사용을 위한 설정
// npm install @reduxjs/toolkit react-redux

/* eslint-disable */
import { configureStore, createSlice } from "@reduxjs/toolkit"

let session = createSlice({
  name : "session",
  initialState : {
    isLoggedIn : false,
    userData : {
      _id : '',
      id : '',
      pw : ''
    }
  },
  reducers : {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    }
  }
})

export default configureStore({
  reducer: {
    session : session.reducer
  }
})

export let { setIsLoggedIn, setUserData } = session.actions;