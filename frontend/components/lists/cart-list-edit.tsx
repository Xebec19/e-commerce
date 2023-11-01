"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { Tooltip, TooltipProvider } from "../ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { ItemsEntity } from "@/interfaces/cart.interface";
import { environment, ellipsis } from "@/lib";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  addCartItem,
  removeCartItem,
  deleteCartItem,
} from "@/lib/http/cart.http";
import { useToast } from "../ui/use-toast";
import { queryClient } from "@/store/query.provider";

const RemoveFromCartIcon = ({ productId }: { productId: number }) => {
  const { toast } = useToast();

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (response) => {
      if (!response.status) {
        toast({
          variant: "destructive",
          title: "Item could not be deleted",
        });

        return;
      }

      queryClient.invalidateQueries({ queryKey: ["/cart"] });
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="absolute dark:text-black-500 right-0 top-0 cursor-pointer"
            onClick={() => deleteItem({ product_id: productId })}
          >
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
  const { toast } = useToast();

  const { mutate: addCart } = useMutation({
    mutationFn: addCartItem,
    onSuccess: (response) => {
      if (!response.status) {
        toast({
          variant: "destructive",
          title: "Cart could not be updated",
        });

        return;
      }

      queryClient.invalidateQueries({ queryKey: ["/cart"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const { mutate: removeCart } = useMutation({
    mutationFn: removeCartItem,
    onSuccess: (response) => {
      if (!response.status) {
        toast({
          variant: "destructive",
          title: "Cart could not be updated",
        });

        return;
      }

      queryClient.invalidateQueries({ queryKey: ["/cart"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  function increment(productId: number) {
    addCart({ product_id: productId, quantity: 1 });
  }

  function decrement(productId: number) {
    removeCart({ product_id: productId, quantity: 1 });
  }

  return (
    <li className="flex justify-between items-start space-x-4 py-4 px-2">
      <div className="w-[80px] h-[80px] relative overflow-hidden rounded-md">
        <Image
          src={item.product_image.String}
          alt={item.product_name.String}
          height={100}
          width={100}
        />
        <RemoveFromCartIcon productId={item.product_id.Int32} />
      </div>

      <div className="flex flex-col flex-1 space-y-2">
        <span className="text-xl">{item.product_name.String}</span>
        <span className="text-md text-slate">
          {ellipsis(item.product_desc.String, 100)}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-md text-right pr-1">
          {environment.CURRENCY_CODE} {item.price.String}
        </span>
        <div className="rounded-full border flex px-2 space-x-2 py-2 items-center">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => decrement(item.product_id.Int32)}
          >
            <Minus />
          </Button>
          <span>{item.quantity.Int32}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => increment(item.product_id.Int32)}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default function CartListEdit({ items }: { items: ItemsEntity[] }) {
  return (
    <div className="max-w-[768px] mb-4">
      <ul className="divide-y list-none border rounded-md">
        {items && items.length ? (
          items?.map((item) => (
            <CartItem key={item.product_id.Int32} item={item} />
          ))
        ) : (
          <h2 className="prose p-4">No Products in the cart</h2>
        )}
      </ul>
    </div>
  );
}
