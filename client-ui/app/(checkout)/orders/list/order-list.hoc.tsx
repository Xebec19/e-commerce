"use client";

import { getOrderList } from "@/lib/http/order.http";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import OrderListItem from "./order-list-item";
import { Fragment, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { queryClient } from "@/store/query.provider";
import { Button } from "@/components/ui/button";

// todo add infinite scrolling here
export default function OrderListHOC() {
  const {
    data: orders,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: getOrderList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) =>
      lastPage[0].totalRows > pages.flat().length
        ? lastPageParam + 1
        : undefined,
    getPreviousPageParam: (firstPage, pages, firstPageParams) =>
      firstPageParams <= 1 ? undefined : firstPageParams - 1,
  });

  console.log({ orders });

  return (
    <div className="space-y-2">
      {orders?.pages?.map((page, index) => (
        <Fragment key={index}>
          {page.map((order) => (
            <OrderListItem key={order.orderId} order={order} />
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <div className="w-full flex justify-center items-center p-2">
          {isFetchingNextPage ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Button variant={"ghost"} onClick={() => fetchNextPage()}>
              Load more
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
