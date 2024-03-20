import {
  IAddress,
  ICheckoutSlice,
  IShippingAddress,
} from "@/interfaces/checkout.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ICheckoutSlice = {
  billingAddress: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
    address: "",
    state: "Delhi",
    zip: "",
  },
  shippingAddress: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
    address: "",
    state: "Delhi",
    zip: "",
    isSameAddressForBilling: false,
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateShippingAddress: (
      state: ICheckoutSlice,
      action: PayloadAction<IShippingAddress>
    ) => {
      state.shippingAddress = action.payload;
      if (action.payload.isSameAddressForBilling) {
        // console.log({ payload: action.payload });
        state.billingAddress = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          phoneNum: action.payload.phoneNum,
          address: action.payload.address,
          state: action.payload.state,
          zip: action.payload.zip,
        };
      }
    },
    updateBillingAddress: (
      state: ICheckoutSlice,
      action: PayloadAction<IAddress>
    ) => {
      state.billingAddress = action.payload;
    },
    clear: () => {
      return initialState;
    },
  },
});

export const { updateShippingAddress, updateBillingAddress, clear } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
