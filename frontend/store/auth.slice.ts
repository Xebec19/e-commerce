import { IAuthState } from "@/interfaces/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  authenticated: false,
  token: null,
  updatedOn: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<IAuthState>) => {
      let authPayload = {
        token: action.payload.token,
        authenticated: action.payload.authenticated,
        updatedOn: new Date(),
      };

      return authPayload;
    },
    removeAuth: (state) => {
      return initialState;
    },
  },
});

export const { updateAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
