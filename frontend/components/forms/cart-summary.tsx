"use client";

import { Button } from "../ui/button";
import CouponForm from "./coupon-form";

export default function CartSummary() {
  return (
    <div>
      <div>
        <CouponForm />
      </div>
      <div className="flex-col divide-y border rounded-md my-4">
        <div className="flex justify-between py-4 px-2">
          <span>Sub Total</span>
          <span>$40 USD</span>
        </div>

        <div className="flex justify-between py-4 px-2">
          <span>Shipping Charges</span>
          <span>$40 USD</span>
        </div>

        <div className="flex justify-between py-4 px-2 text-green-500 font-bold">
          <span>Coupon WELCOME10</span>
          <span>- $40 USD</span>
        </div>

        <div className="flex justify-between py-4 px-2">
          <span>Total</span>
          <span>$40 USD</span>
        </div>
      </div>
      <div className="text-right">
        <Button className="uppercase"> Proceed to Checkout</Button>
      </div>
    </div>
  );
}
