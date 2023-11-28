import {
  IConfirmOrderRequest,
  IConfirmOrderResponse,
  ICreateOrderRequest,
  ICreateOrderResponse,
  IOrderDetailsPayload,
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
}): Promise<AxiosResponse<IConfirmOrderResponse>> => {
  let url = "/order/v1/confirm-order";
  return requestAPI.post(url, payload);
};

export const getOrderDetails = async ({
  orderId,
}: {
  orderId: string;
}): Promise<IOrderDetailsPayload> => {
  let url = `/order/v1/get-order/${orderId}`;

  const { data } = await requestAPI.get(url);

  return data.payload;
};
