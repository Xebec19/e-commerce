"use client";

import { getOrderList } from "@/lib/http/order.http";
import { useInfiniteQuery } from "@tanstack/react-query";
import OrderListItem from "./order-list-item";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  return (
    <div className="space-y-2">
      {orders?.pages?.map((page, index) => (
        <Fragment key={index}>
          {page.map((order) => (
            <Link key={order.orderId} href={"/orders/" + order.orderId}>
              <OrderListItem order={order} />
            </Link>
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <div className="w-full flex justify-center items-center p-2">
          <Button
            variant={"ghost"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
