import {
  INullableInt32,
  INullableString,
  IResponse,
} from "./general.interface";

export interface ICategoryPayload {
  category_id: string;
  category_name: string;
  image_url: string;
}

export interface IProductPayload {
  product_id: number;
  product_name: string;
  image_url: string;
  quantity: INullableInt32;
  product_desc: INullableString;
  price: INullableInt32;
  delivery_price: INullableInt32;
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
  price: INullableInt32;
  quantity: INullableInt32;
  delivery_price: INullableInt32;
  category_id: number;
  category_name: string;
}

export interface ISimilarProductResponse extends IResponse {
  payload: IProductPayload[];
}

export interface IProductImagePayload {
  img_id: string;
  product_id: INullableInt32;
  image_url: string;
}

export interface IProductImagesResponse extends IResponse {
  payload: IProductImagePayload[];
}
