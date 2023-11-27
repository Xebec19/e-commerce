import { IResponse } from "./general.interface";

export interface ICreateOrderRequest {
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingAddress: string;
  billingPhone: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingEmail: string;
  shippingAddress: string;
  shippingPhone: string;
}

export interface ICreateOrderPayload {
  deliveryPrice: number;
  discountTotal: number;
  orderId: string;
  subTotal: number;
  total: number;
}

export interface ICreateOrderResponse extends IResponse {
  payload: ICreateOrderPayload;
}

export interface IConfirmOrderRequest {
  paymentId: string;
  orderId: string;
  signature: string;
}
