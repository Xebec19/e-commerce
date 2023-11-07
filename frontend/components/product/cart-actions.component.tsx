"use client";

import { IProductPayload } from "@/interfaces/product.interface";
import { Button } from "../ui/button";
import { Loader2, Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { errorMessage } from "@/lib/messages";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addCartItem, deleteCartItem } from "@/lib/http/cart.http";
import { useToast } from "../ui/use-toast";
import { queryClient } from "@/store/query.provider";

export default function CartActions({ product }: { product: IProductPayload }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const { mutate: addItem, isPending: addItemPending } = useMutation({
    mutationFn: addCartItem,
    onSuccess: (response) => {
      if (!response?.status) {
        toast({
          variant: "destructive",
          title: "item could not be added",
        });

        return;
      }

      toast({
        title: "item added",
      });

      queryClient.invalidateQueries({ queryKey: ["/cart"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const { mutate: removeItem, isPending: removeItemPending } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (response) => {
      if (!response?.status) {
        toast({
          variant: "destructive",
          title: "item could not be removed",
        });

        return;
      }

      toast({
        title: "item removed",
      });

      queryClient.invalidateQueries({ queryKey: ["/cart"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const incrementQuantity = () => {
    if (quantity > product.quantity.Int32) {
      showError(errorMessage.AboveQuantityLimit);
      return;
    } else {
      removeError();
    }
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity === 1) {
      showError(errorMessage.BelowQuantityLimit);
      return;
    } else {
      removeError();
    }
    setQuantity(quantity - 1);
  };

  function showError(message: string) {
    setError(message);
  }

  function removeError() {
    setError("");
  }

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full py-4 items-center">
        <div className="flex justify-between items-center rounded-full border py-1">
          <Button size={"icon"} variant={"ghost"} onClick={incrementQuantity}>
            <Plus />
          </Button>
          <span className="text-2xl prose">{quantity}</span>
          <Button size={"icon"} variant={"ghost"} onClick={decrementQuantity}>
            <Minus />
          </Button>
        </div>
        {addItemPending ? (
          <Button variant={"destructive"} disabled>
            <Loader2 className="animate-spin" />
            &nbsp; Please wait
          </Button>
        ) : (
          <Button
            variant={"default"}
            onClick={() =>
              addItem({ product_id: product.product_id, quantity: quantity })
            }
          >
            <ShoppingCart />
            &nbsp; Add
          </Button>
        )}
        {removeItemPending ? (
          <Button variant={"destructive"} disabled>
            <Loader2 className="animate-spin" />
            &nbsp; Please wait
          </Button>
        ) : (
          <Button
            variant={"destructive"}
            onClick={() => removeItem({ product_id: product.product_id })}
          >
            <Trash />
            &nbsp; Remove
          </Button>
        )}
      </div>
    </>
  );
}
