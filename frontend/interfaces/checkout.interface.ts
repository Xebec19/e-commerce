export interface ICheckoutSlice {
  shippingAddress: IShippingAddress;
  billingAddress: IAddress;
}

export interface IAddress {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNum: string;
  address: string;
  state: string;
  zip: string;
}

export interface IShippingAddress extends IAddress {
  isSameAddressForBilling: boolean;
}
