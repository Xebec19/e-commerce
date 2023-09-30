"use client";

import { Card } from "@/components/ui/card";
import ProductImages from "../carousel/product-images";
import { IProductDetails } from "../product/product-card";
import PriceLabel from "../labels/price-label";
import { Separator } from "../ui/separator";
import { Plus, ShoppingCart, Trash, X } from "lucide-react";
import { useState } from "react";
import { errorMessage } from "@/lib/messages";
import { Button } from "../ui/button";

const PRODUCT: IProductDetails = {
  name: "Product Name",
  price: 42,
  image: "/dummy-t-shirt.jpg",
  currency: "rupee",
  currencyCode: "$",
  size: "full",
  description:
    "Please note that these are the default ports for these email protocols, and your email service provider may use different ports. Additionally, secure versions of these protocols (SMTPS, POP3S, IMAPS) are recommended for enhanced security, as they encrypt your email communication. Always check with your email provider for the specific settings to use when configuring your email client or server.",
};

const MAX_QUANTITY = 10;

export default function ProductDescription() {
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const incrementQuantity = () => {
    if (quantity > MAX_QUANTITY) {
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
    <article role="product description">
      <Card className="grid grid-cols-1 md:grid-cols-3 p-4 dark:bg-black">
        <div className="h-[400px] col-span-2">
          <ProductImages />
        </div>
        <div>
          <h1 className="text-5xl font-medium mb-2">Product Title</h1>
          <div className="flex w-full">
            <PriceLabel payload={PRODUCT} />
          </div>
          <div className="py-4">
            <Separator />
          </div>
          <p className="py-4 prose">{PRODUCT.description}</p>

          <span className="text-red-500 text-sm prose my-1">{error}</span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full py-4 items-center">
            <div className="flex justify-between items-center rounded-full border py-1">
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={incrementQuantity}
              >
                <Plus />
              </Button>
              <span className="text-2xl prose">{quantity}</span>
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={decrementQuantity}
              >
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
        </div>
      </Card>
    </article>
  );
}
