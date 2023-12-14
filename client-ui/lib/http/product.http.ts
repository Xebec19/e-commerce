import {
  ISimilarProductResponse,
  IProductPayload,
  IProductResponse,
  IProductImagesResponse,
  ICategoryResponse,
} from "@/interfaces/product.interface";
import { environment } from "..";
import requestAPI from "./request";
import { AxiosResponse } from "axios";
import { z } from "zod";

const CategorySchema = z.object({
  category_id: z.number(),
  category_name: z.string(),
  image_url: z.object({
    String: z.string(),
    Valid: z.boolean(),
  }),
});

export const fetchCategories = async () => {
  let url = `${environment.BASE_URL}/product/v1/category-list`;

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<ICategoryResponse>
  >);

  return z.array(CategorySchema).parse(response.data.payload);
};

export const fetchNewProducts = (): Promise<IProductPayload[]> => {
  let requestOptions = {
    method: "GET",
  };

  let url = `${environment.BASE_URL}/product/v1/new-products?page=0&size=15`;

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((response) => response.payload);
};

export const fetchTopProducts = () => {
  var requestOptions = {
    method: "GET",
  };

  let url = `${environment.BASE_URL}/product/v1/list?page=0&size=3`;

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((response) => response.payload);
};

export const getProduct = ({
  slug,
}: {
  slug: string;
}): Promise<AxiosResponse<IProductResponse>> => {
  let url = `/product/v1/details/${slug}`;

  return requestAPI.get(url);
};

export const getSimilarItems = ({
  slug,
  page = 0,
  size = 15,
}: {
  slug: string;
  page: number;
  size: number;
}): Promise<AxiosResponse<ISimilarProductResponse>> => {
  let url = `/product/v1/similar-products/${slug}?page=${page}&size=${size}`;

  return requestAPI.get(url);
};

export const getProductImages = ({
  slug,
}: {
  slug: string;
}): Promise<AxiosResponse<IProductImagesResponse>> => {
  let url = `/product/v1/product-images/${slug}`;

  return requestAPI.get(url);
};

const ProductSchema = z.object({
  product_id: z.number(),
  product_name: z.string(),
  image_url: z.string(),
  quantity: z.object({ Int32: z.number(), Valid: z.boolean() }),
  product_desc: z.object({ String: z.string(), Valid: z.boolean() }),
  price: z.object({ Int32: z.number(), Valid: z.boolean() }),
  delivery_price: z.object({ Int32: z.number(), Valid: z.boolean() }),
  total_count: z.number(),
});

export const getProductByPage = async ({
  pageParam: page,
  size = 10,
}: {
  pageParam: number;
  size?: number;
}) => {
  let url = `/product/v1/products-scroll?page=${page}&size=${size}`;

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<IProductResponse>
  >);

  return z.array(ProductSchema).parse(response.data.payload);
};
