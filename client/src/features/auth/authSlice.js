// dependencies
import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, LogoutUser, RegisterUser } from "./authApiSlice";

// creating slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("loginUser")
      ? JSON.parse(localStorage.getItem("loginUser"))
      : null,
    isLoading: false,
    message: null,
    error: null,
  },
  reducers: {
    setErrorMsgEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      // login user
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        localStorage.setItem("loginUser", JSON.stringify(action.payload.user));
      })
      // logout user 
      .addCase(LogoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(LogoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        localStorage.removeItem("loginUser");
        state.user = null;
      })
  },
});

// export selector
export const authSelect = (state) => state.auth;

// export actions
export const { setErrorMsgEmpty } = authSlice.actions;

// export reducer
export default authSlice.reducer;
