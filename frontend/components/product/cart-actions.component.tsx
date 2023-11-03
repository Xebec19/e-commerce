"use client";

import { IProductPayload } from "@/interfaces/product.interface";
import { Button } from "../ui/button";
import { Plus, ShoppingCart, Trash, X } from "lucide-react";
import { errorMessage } from "@/lib/messages";
import { useState } from "react";

export default function CartActions({ product }: { product: IProductPayload }) {
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<string>("");

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
    if (quantity === 0) {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full py-4 items-center">
        <div className="flex justify-between items-center rounded-full border py-1">
          <Button size={"icon"} variant={"ghost"} onClick={incrementQuantity}>
            <Plus />
          </Button>
          <span className="text-2xl prose">{quantity}</span>
          <Button size={"icon"} variant={"ghost"} onClick={decrementQuantity}>
            <X />
          </Button>
        </div>
        <Button variant={"default"}>
          Add&nbsp;
          <ShoppingCart />
        </Button>
        <Button variant={"destructive"}>
          Remove&nbsp;
          <Trash />
        </Button>
      </div>
    </>
  );
}
