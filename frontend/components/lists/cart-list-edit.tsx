"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import CouponForm from "../forms/coupon-form";
import { Button } from "../ui/button";

function CartItem() {
  return (
    <li className="flex flex-wrap justify-between items-center">
      <div className="w-[80px] h-[80px]">
        <Image fill src={"/dummy-t-shirt.jpg"} alt="some awesome product" />
        <X className="absolute right-0 top-0" />
      </div>

      <div className="flex flex-col">
        <span className="text-xl">Super awesome tshirt</span>
        <span className="text-md text-slate">White / M</span>
      </div>

      <div className="flex flex-col">
        <span className="text-xl">$ 30.00 USD</span>
        <div className="rounded-full border flex">
          <Minus />
          <span>2</span>
          <Plus />
        </div>
      </div>
    </li>
  );
}

// TODO add amount details here
function Amount() {
  return <div className="flex-col divide-y"></div>;
}

export default function CartListEdit() {
  return (
    <>
      <ul className="my-4 max-w-[768px] divide-y list-none">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </ul>
      <CouponForm />
      <Amount />
      <div>
        <Button className="uppercase"> Proceed to Checkout</Button>
      </div>
    </>
  );
}
