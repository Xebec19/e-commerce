import { IProductPayload } from "@/interfaces/product.interface";
import { environment } from "..";

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
