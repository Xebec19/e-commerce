import {
  INullableInt32,
  INullableString,
  IResponse,
} from "./general.interface";

export interface ICategoryResponse extends IResponse {
  payload: ICategoryPayload[];
}

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
  total_count?: number;
}

export interface IProductResponse extends IResponse {
  payload: IProductPayload;
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
