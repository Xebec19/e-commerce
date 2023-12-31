import { ICartResponse, IUpdateCart } from "@/interfaces/cart.interface";
import requestAPI from "./request";
import { AxiosResponse } from "axios";

export function getCart(): Promise<AxiosResponse<ICartResponse>> {
  return requestAPI.get("/cart/cart-details");
}

export function addCartItem(props: IUpdateCart) {
  return requestAPI.post("/cart/add-product", props);
}

export function removeCartItem(props: IUpdateCart) {
  return requestAPI.post("/cart/remove-product", props);
}

export function deleteCartItem(props: { product_id: number }) {
  return requestAPI.post("/cart/delete-product", props);
}
