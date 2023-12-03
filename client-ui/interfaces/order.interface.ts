import {
  INullableInt32,
  INullableString,
  INullableTimestamp,
  IResponse,
} from "./general.interface";

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

export interface IConfirmOrderPayload {
  orderId: string;
  status: string;
}

export interface IConfirmOrderResponse extends IResponse {
  payload: IConfirmOrderPayload;
}

export interface IOrderDetailsPayload {
  orderInfo: OrderInfo;
  orderItems?: OrderItemsEntity[] | null;
}
export interface OrderInfo {
  order_id: string;
  user_id: INullableInt32;
  price: INullableInt32;
  delivery_price: INullableInt32;
  discount_amount: INullableInt32;
  discount_code: INullableString;
  total: INullableInt32;
  status: Status;
  created_on: INullableTimestamp;
  billing_first_name: string;
  billing_last_name: string;
  billing_email: string;
  billing_address: INullableString;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_email: string;
  shipping_address: INullableString;
  discount_id: INullableInt32;
  billing_phone: INullableString;
  shipping_phone: INullableString;
  payment_id: INullableString;
  transaction_signature: INullableString;
}
export interface OrderItemsEntity {
  od_id: number;
  order_id: INullableString;
  product_id: INullableInt32;
  product_price: number;
  quantity: number;
  delivery_price: number;
  image_url: INullableString;
  product_name: INullableString;
  product_desc: INullableString;
  category_id: INullableInt32;
}

export interface IOrderListResponse extends IResponse {
  payload: IOrderListEntity[];
}

export interface IOrderListEntity {
  order_id: string;
  user_id: INullableInt32;
  price: INullableInt32;
  delivery_price: INullableInt32;
  total: INullableInt32;
  status: Status;
  created_on: INullableTimestamp;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_email: string;
  shipping_address: INullableString;
  shipping_phone: INullableString;
  discount_code: INullableString;
  discount_amount: INullableInt32;
}

export interface Status {
  enum_order_status: string;
  valid: boolean;
}
