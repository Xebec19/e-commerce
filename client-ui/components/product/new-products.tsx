"use client";

import ProductCard from "@/components/product/product-card";
import { getProductByPage } from "@/lib/http/product.http";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";

export default function NewProducts() {
  const {
    data: newProducts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["new-products"],
    queryFn: getProductByPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) =>
      lastPage[0].total_count > pages.flat().length
        ? lastPageParam + 1
        : undefined,
    getPreviousPageParam: (firstPage, pages, firstPageParams) =>
      firstPageParams <= 1 ? undefined : firstPageParams - 1,
  });

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    }

    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-4">
      <h3 className="prose text-xl font-bold mb-2">New Arrivals</h3>
      <section
        role="new products"
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 m-auto"
      >
        {newProducts?.pages?.map((page, index) => (
          <Fragment key={index}>
            {page.map((product) => (
              <div
                key={product.product_id}
                className="aspect-square w-full md:w-[32vw] h-[400px] border"
              >
                <ProductCard
                  payload={product}
                  sizes="(min-width: 768px) 32vw, 80vw"
                />
              </div>
            ))}
          </Fragment>
        ))}
      </section>
    </div>
  );
}
