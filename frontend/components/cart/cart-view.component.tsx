"use client";

import { getCart } from "@/lib/http/cart.http";
import { useQuery } from "@tanstack/react-query";
import CartListEdit from "../lists/cart-list-edit";
import CartSummary from "../forms/cart-summary";

export default function CartViewComponent() {
  const { data: cartPayload } = useQuery({
    queryKey: ["/cart"],
    queryFn: getCart,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <CartListEdit items={cartPayload?.data?.payload?.items} />
      <CartSummary cartDetails={cartPayload?.data?.payload?.cartPayload} />
    </div>
  );
}
