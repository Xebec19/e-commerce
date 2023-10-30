"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { Tooltip, TooltipProvider } from "../ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { ItemsEntity } from "@/interfaces/cart.interface";
import { environment } from "@/lib";

const RemoveFromCartIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="absolute dark:text-black-500 right-0 top-0 cursor-pointer">
            <X className="dark:text-black" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Remove from cart</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

function CartItem({ item }: { item: ItemsEntity }) {
  return (
    <li className="flex justify-between items-start space-x-4 py-4 px-2">
      <div className="w-[80px] h-[80px] relative overflow-hidden rounded-md">
        <Image
          src={item.product_image.String}
          alt={item.product_name.String}
          height={100}
          width={100}
        />
        <RemoveFromCartIcon />
      </div>

      <div className="flex flex-col flex-1 space-y-2">
        <span className="text-xl">{item.product_name.String}</span>
        <span className="text-md text-slate">{item.product_desc.String}</span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-md text-right pr-1">
          {environment.CURRENCY_CODE} {item.price.String}
        </span>
        <div className="rounded-full border flex px-2 space-x-2 py-2">
          <Minus />
          <span>{item.quantity.Int32}</span>
          <Plus />
        </div>
      </div>
    </li>
  );
}

export default function CartListEdit({ items }: { items: ItemsEntity[] }) {
  return (
    <div className="max-w-[768px] mb-4">
      <ul className="divide-y list-none border rounded-md">
        {items.map((item) => (
          <CartItem key={item.product_id.Int32} item={item} />
        ))}
      </ul>
    </div>
  );
}
