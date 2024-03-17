import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/axios";


/**
 * @description - register user reducer function.
 * @param {*} data - form data
 */
export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  async (data) => {
    try {
      const response = await API.post("/auth/register", data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - login user reducer function
 * @param {*} data - auth(email or mobile) & password data
 */
export const LoginUser = createAsyncThunk("auth/LoginUser", async (data) => {
  try {
    const response = await API.post("/auth/login", data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});


/**
 * @description - logout user reducer function
 */
export const LogoutUser = createAsyncThunk("auth/LogoutUser", async() => {
  try {
    const response = await API.post("/auth/logout", '');
    return response;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
})