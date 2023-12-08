import {
  IConfirmOrderRequest,
  IConfirmOrderResponse,
  ICreateOrderRequest,
  ICreateOrderResponse,
  IOrderDetailsPayload,
  IOrderListResponse,
} from "@/interfaces/order.interface";
import { AxiosResponse } from "axios";
import requestAPI from "./request";
import { z } from "zod";
import { OrderListSchema } from "@/app/(checkout)/orders/list/order-list-item";

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

export const getOrderList = async ({
  pageParam,
  size = 10,
}: {
  pageParam: number;
  size?: number;
}) => {
  let url = `/order/v1/get-orders?page=${pageParam}&size=${size}`;

  const { data } = await (requestAPI.get(url) as Promise<
    AxiosResponse<IOrderListResponse>
  >);

  return z.array(OrderListSchema).parse(
    data?.payload?.map((order) => ({
      orderId: order.order_id,
      // userId: order.user_id.Int32,
      price: order.price.Int32,
      deliveryPrice: order.delivery_price.Int32,
      total: order.total.Int32,
      status: order.status.enum_order_status,
      createdOn: order.created_on.Time,
      shippingFirstName: order.shipping_first_name,
      shippingLastName: order.shipping_last_name,
      shippingEmail: order.shipping_email,
      shippingAddress: order.shipping_address.String,
      shippingPhone: order.shipping_phone.String,
      discountCode: order.discount_code.String,
      discountAmount: order.discount_amount.Int32,
      totalRows: order.total_orders,
    }))
  );
};
