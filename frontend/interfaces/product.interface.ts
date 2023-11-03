import {
  INullableInt32,
  INullableString,
  IResponse,
} from "./general.interface";

export interface ICategoryPayload {
  category_id: string;
  category_name: string;
  image_url: INullableString;
}

export interface IProductPayload {
  product_id: number;
  product_name: string;
  product_image: INullableString;
  quantity: INullableInt32;
  product_desc: INullableString;
  price: string;
  delivery_price: INullableString;
  is_featured?: boolean;
}

export interface IProductResponse extends IResponse {
  payload: IProductPayload;
}
export interface IProductPayload {
  product_id: number;
  product_name: string;
  product_image: INullableString;
  product_desc: INullableString;
  price: string;
  quantity: INullableInt32;
  delivery_price: INullableString;
  category_id: number;
  category_name: string;
}

export interface ICategoryResponse extends IResponse {
  payload: IProductPayload[];
}
