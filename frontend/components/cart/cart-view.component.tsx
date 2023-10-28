"use client";

import { getCart } from "@/lib/http/cart.http";
import { useQuery } from "@tanstack/react-query";
import CartListEdit from "../lists/cart-list-edit";
import CartSummary from "../forms/cart-summary";

export default function CartViewComponent() {
  const { data: cartDetails, error } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  console.log({ cartDetails, error });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <CartListEdit />
      <CartSummary />
    </div>
  );
}
