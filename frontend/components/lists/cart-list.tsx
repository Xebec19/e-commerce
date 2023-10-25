"use client";

import { Badge } from "../ui/badge";

export default function CartList() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl prose font-bold">Your cart</h1>
        <span>
          <Badge variant="default">
            <span className="text-xl">4</span>
          </Badge>
        </span>
      </div>

      <ul className="border divide-y  rounded-md list-none my-4">
        <li className="flex justify-between items center px-2 py-4">
          <div className="flex flex-col">
            <span className="text-md font-bold">Product Name</span>
            <span className="text-md">Brief description</span>
          </div>
          <span className="text-xl">$12</span>
        </li>

        <li className="flex justify-between items center px-2 py-4">
          <div className="flex flex-col">
            <span className="text-md font-bold">Product Name</span>
            <span className="text-md">Brief description</span>
          </div>
          <span className="text-xl">$12</span>
        </li>

        <li className="flex justify-between items center px-2 py-4">
          <div className="flex flex-col">
            <span className="text-md font-bold">Product Name</span>
            <span className="text-md">Brief description</span>
          </div>
          <span className="text-xl">$12</span>
        </li>

        <li className="flex justify-between items center px-2 py-4">
          <div className="flex flex-col">
            <span className="text-md font-bold">Product Name</span>
            <span className="text-md">Brief description</span>
          </div>
          <span className="text-xl">$12</span>
        </li>

        <li className="flex justify-between items center px-2 py-4 text-lime-500">
          <div className="flex flex-col">
            <span className="text-md font-bold">Promo Code</span>
            <span className="text-md">EXAMPLECODE</span>
          </div>
          <span className="text-xl">- $12</span>
        </li>

        <li className="flex justify-between items center px-2 py-4">
          <div className="flex flex-col">
            <span className="text-md font-bold">Total</span>
          </div>
          <span className="text-xl">$12</span>
        </li>
      </ul>
    </>
  );
}
