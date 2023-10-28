import { environment } from "..";
import requestAPI from "./request";

export function getCart() {
  return requestAPI.get("/cart/cart-details");
}
