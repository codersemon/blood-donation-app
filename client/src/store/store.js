// dependencies
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// configure store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
});

// export store
export default store;
