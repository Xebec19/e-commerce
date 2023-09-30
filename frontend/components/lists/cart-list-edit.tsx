"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";

function CartItem() {
  return (
    <li className="flex justify-between items-center space-x-4 py-4 px-2">
      <div className="w-[80px] h-[80px] relative overflow-hidden rounded-md">
        <Image fill src={"/dummy-t-shirt.jpg"} alt="some awesome product" />
        <span className="rounded-full p-1 bg-black">
          <X size={"20px"} />
        </span>
      </div>

      <div className="flex flex-col flex-1">
        <span className="text-xl">Super awesome tshirt</span>
        <span className="text-md text-slate">White / M</span>
      </div>

      <div className="flex flex-col">
        <span className="text-md text-right pr-1">$ 30.00 </span>
        <div className="rounded-full border flex px-2 space-x-2 py-2">
          <Minus />
          <span>2</span>
          <Plus />
        </div>
      </div>
    </li>
  );
}

export default function CartListEdit() {
  return (
    <div className="max-w-[768px] mb-4">
      <ul className="divide-y list-none border rounded-md">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </ul>
    </div>
  );
}
