"use client";

import { CartPayload } from "@/interfaces/cart.interface";
import { Button } from "../ui/button";
import CouponForm from "./coupon-form";
import { environment } from "@/lib";

export default function CartSummary({
  cartDetails,
}: {
  cartDetails: CartPayload;
}) {
  return (
    <div>
      <div>
        <CouponForm />
      </div>
      <div className="flex-col divide-y border rounded-md my-4">
        <div className="flex justify-between py-4 px-2">
          <span>Sub Total</span>
          <span>{`${environment.CURRENCY_CODE} ${cartDetails?.Price.toFixed(
            2
          )} ${environment.CURRENCY}`}</span>
        </div>

        <div className="flex justify-between py-4 px-2">
          <span>Delivery Charges</span>
          <span>{`${
            environment.CURRENCY_CODE
          } ${cartDetails?.DeliveryPrice.toFixed(2)} ${
            environment.CURRENCY
          }`}</span>
        </div>

        {cartDetails?.DiscountCode && (
          <div className="flex justify-between py-4 px-2 text-green-500 font-bold">
            <span>{cartDetails?.DiscountCode}</span>
            <span>
              {" "}
              -{" "}
              {`${environment.CURRENCY_CODE} ${cartDetails?.Discount.toFixed(
                2
              )} ${environment.CURRENCY}`}
            </span>
          </div>
        )}

        <div className="flex justify-between py-4 px-2">
          <span>Total</span>
          <span>{`${environment.CURRENCY_CODE} ${cartDetails?.Total.toFixed(
            2
          )} ${environment.CURRENCY}`}</span>
        </div>
      </div>
      <div className="text-right">
        <Button className="uppercase"> Proceed to Checkout</Button>
      </div>
    </div>
  );
}
