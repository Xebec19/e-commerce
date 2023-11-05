import {
  ISimilarProductResponse,
  IProductPayload,
  IProductResponse,
} from "@/interfaces/product.interface";
import { environment } from "..";
import requestAPI from "./request";
import { AxiosResponse } from "axios";

export const fetchCategories = () => {
  var requestOptions = {
    method: "GET",
  };

  let url = `${environment.BASE_URL}/product/v1/category-list`;

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((response) => response.payload);
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
