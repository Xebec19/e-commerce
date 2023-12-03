"use client";

import { getOrderList } from "@/lib/http/order.http";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import OrderListItem from "./order-list-item";

export default function OrderListHOC() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "10";

  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrderList({ page: +page, size: +size }),
  });

  return (
    <div className="space-y-2">
      {orders?.map((order) => (
        <OrderListItem key={order.orderId} order={order} />
      ))}
    </div>
  );
}
