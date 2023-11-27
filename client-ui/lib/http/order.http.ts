import {
  IConfirmOrderRequest,
  ICreateOrderRequest,
  ICreateOrderResponse,
} from "@/interfaces/order.interface";
import { AxiosResponse } from "axios";
import requestAPI from "./request";

export const createOrder = ({
  payload,
}: {
  payload: ICreateOrderRequest;
}): Promise<AxiosResponse<ICreateOrderResponse>> => {
  let url = "/order/v1/create-order";
  return requestAPI.post(url, payload);
};

export const confirmOrder = ({
  payload,
}: {
  payload: IConfirmOrderRequest;
}) => {
  let url = "/order/v1/confirm-order";
  return requestAPI.post(url, payload);
};
