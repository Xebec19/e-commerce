"use client";

import { getCart } from "@/lib/http/cart.http";
import { useQuery } from "@tanstack/react-query";
import CouponForm from "../forms/coupon-form";
import CartList from "../lists/cart-list";

export default function CartListView() {
  const { data: cartPayload } = useQuery({
    queryKey: ["/cart"],
    queryFn: getCart,
  });

  return (
    <section role="cart details">
      <CartList cart={cartPayload?.data.payload} />
      <CouponForm />
    </section>
  );
}
