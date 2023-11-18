import { IUserState } from "@/interfaces/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserState = {
  userId: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  access: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUserState>) => {
      let user = {
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        access: action.payload.access,
      };

      return user;
    },
    deleteUser: () => {
      return initialState;
    },
  },
});

export const { updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
