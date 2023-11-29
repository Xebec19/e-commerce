"use client";

import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { OrderInfo, OrderItemsEntity } from "@/interfaces/order.interface";
import { ellipsis, environment } from "@/lib";
import { getOrderDetails } from "@/lib/http/order.http";
import { orderStatusHelperText } from "@/lib/messages";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useQuery } from "@tanstack/react-query";
import { HelpCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export const metadata = {
  title: "Order | " + environment.SITE_NAME,
  description: `Discover a world of endless shopping possibilities with our ${environment.SITE_NAME} Shop the latest trends, find exclusive deals, and explore a vast selection of products from the comfort of your device.`,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: "website",
    images: [
      {
        url: "/icons8-shopaholic-color-96.png",
        width: 96,
        height: 96,
      },
    ],
  },
};

export default function OrderDetaisHOC() {
  const params = useParams();
  const orderId = params["orderId"] + "";

  const { data: order } = useQuery({
    queryKey: [`/get-order/${orderId}`],
    queryFn: () => getOrderDetails({ orderId }),
  });

  return (
    <section role="order details">
      <div className="flex justify-between">
        <h1 className="text-2xl prose font-bold">
          Order Details for{" "}
          <span className="uppercase text-green-500">{orderId}</span>
        </h1>
        <div className="flex space-x-2 items-center cursor-pointer">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-sm break-words bg-background p-2 rounded-md">
                  {orderStatusHelperText({
                    message: order?.orderInfo?.status.enum_order_status + "",
                  })}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-xl prose font-bold">Processing</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {order?.orderItems?.length ? (
          <OrderItems orderList={order.orderItems} />
        ) : (
          <></>
        )}
        {order ? <OrderSummary orderInfo={order.orderInfo} /> : <></>}
      </div>
    </section>
  );
}

const OrderSummary = ({ orderInfo }: { orderInfo: OrderInfo }) => {
  return (
    <div>
      <div className="flex-col divide-y border rounded-md mb-4">
        <div className="flex justify-between py-4 px-2">
          <span>Sub Total</span>
          <span>{`${environment.CURRENCY_CODE} ${
            orderInfo?.price?.Int32?.toFixed(2) ?? 0
          } ${environment.CURRENCY}`}</span>
        </div>

        <div className="flex justify-between py-4 px-2">
          <span>Delivery Charges</span>
          <span>{`${environment.CURRENCY_CODE} ${
            orderInfo?.delivery_price?.Int32?.toFixed(2) ?? 0
          } ${environment.CURRENCY}`}</span>
        </div>

        {orderInfo?.discount_code?.String?.length ? (
          <div className="flex justify-between py-4 px-2 text-green-500 font-bold items-center">
            <div className="flex items-center">
              {orderInfo?.discount_code?.String}
            </div>
            <span>
              {" "}
              -{" "}
              {`${
                environment.CURRENCY_CODE
              } ${orderInfo?.discount_amount?.Int32?.toFixed(2)} ${
                environment.CURRENCY
              }`}
            </span>
          </div>
        ) : (
          <></>
        )}

        <div className="flex justify-between py-4 px-2">
          <span>Total</span>
          <span>{`${environment.CURRENCY_CODE} ${
            orderInfo?.total?.Int32?.toFixed(2) ?? 0
          } ${environment.CURRENCY}`}</span>
        </div>
      </div>
    </div>
  );
};

const OrderItems = ({ orderList }: { orderList: OrderItemsEntity[] }) => {
  return (
    <div className="max-w-[768px] mb-4">
      <ul className="divide-y list-none border rounded-md">
        {orderList && orderList.length ? (
          orderList?.map((item) => (
            <Item key={item.product_id.Int32} item={item} />
          ))
        ) : (
          <h2 className="prose p-4">No Products Found!</h2>
        )}
      </ul>
    </div>
  );
};

const Item = ({ item }: { item: OrderItemsEntity }) => {
  return (
    <li className="flex justify-between items-start space-x-4 py-4 px-2">
      <div className="w-[80px] h-[80px] relative overflow-hidden rounded-md">
        <Image
          src={item.image_url.String}
          alt={item.product_name.String}
          height={100}
          width={100}
        />
      </div>

      <div className="flex flex-col flex-1 space-y-2">
        <Link
          href={`/product/${item.product_name.String}_${item.product_id.Int32}`}
        >
          <span className="text-xl">{item.product_name.String}</span>
        </Link>
        <span className="text-md text-slate">
          {ellipsis(item.product_desc.String, 100)}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-md text-right pr-1">
          {environment.CURRENCY_CODE} {item.product_price.toFixed(2)}
        </span>
        <div className="flex px-2 space-x-2 py-2 items-center">
          <X />
          <span className="text-xl">{item.quantity}</span>
        </div>
      </div>
    </li>
  );
};
