import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import authReducer from "./auth.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
