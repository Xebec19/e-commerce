import { INullableInt32, INullableString } from "./general.interface";

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
