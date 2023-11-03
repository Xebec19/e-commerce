import { INullableInt32, INullableString } from "./general.interface";

export interface ICartPayload {
  message: string;
  payload: Payload;
  status: boolean;
}
export interface Payload {
  cartPayload: CartPayload;
  items?: ItemsEntity[] | null;
}
export interface CartPayload {
  CartId: number;
  Price: number;
  DiscountCode: string;
  DeliveryPrice: number;
  Discount: number;
  Total: number;
}
export interface ItemsEntity {
  cd_id: number;
  cart_id: INullableInt32;
  product_id: INullableInt32;
  quantity: INullableInt32;
  product_name: INullableString;
  product_image: INullableString;
  price: INullableString;
  product_desc: INullableString;
  delivery_price: INullableString;
}
