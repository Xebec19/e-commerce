import { INullableInt32, INullableString } from "./general.interface";

export interface ICartPayload {
  cart: Cart;
  items?: ItemsEntity[] | null;
}
export interface Cart {
  cart_id: number;
  discount_code: INullableString;
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
export interface CartIdOrProductIdOrQuantity {
  Int32: number;
  Valid: boolean;
}
