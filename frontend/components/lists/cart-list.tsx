"use client";

import { ICartPayload } from "@/interfaces/cart.interface";
import { Badge } from "../ui/badge";
import { ellipsis, environment } from "@/lib";

export default function CartList({ cart }: { cart: ICartPayload }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl prose font-bold">Your cart</h1>
        <span>
          <Badge variant="default">
            <span className="text-xl">{cart?.items?.length ?? 0}</span>
          </Badge>
        </span>
      </div>

      <ul className="border divide-y  rounded-md list-none my-4">
        {cart?.items?.map((item) => (
          <li
            key={item.product_id.Int32}
            className="flex justify-between items center px-2 py-4"
          >
            <div className="flex flex-col">
              <span className="text-md font-bold">
                {item.product_name.String}
              </span>
              <span className="text-md">
                {ellipsis(item.product_desc.String, 60)}
              </span>
            </div>
            <span className="text-md flex">{`${environment.CURRENCY_CODE} ${
              !isNaN(+item?.price.String)
                ? parseInt(item?.price.String).toFixed(2)
                : "-"
            } ${environment.CURRENCY}`}</span>
          </li>
        ))}

        <li className="flex justify-between items center px-2 py-4">
          <div className="flex flex-col">
            <span className="text-md font-bold">Sub Total</span>
          </div>
          <span className="text-md">
            {" "}
            {`${environment.CURRENCY_CODE} ${
              !isNaN(+cart?.cartPayload?.Price)
                ? cart?.cartPayload?.Price.toFixed(2)
                : "-"
            } ${environment.CURRENCY}`}
          </span>
        </li>

        <li className="flex justify-between items center px-2 py-4">
          <div className="flex flex-col">
            <span className="text-md font-bold">Delivery Charges</span>
          </div>
          <span className="text-md">
            {" "}
            {`${environment.CURRENCY_CODE} ${
              !isNaN(+cart?.cartPayload?.DeliveryPrice)
                ? cart?.cartPayload?.DeliveryPrice.toFixed(2)
                : "-"
            } ${environment.CURRENCY}`}
          </span>
        </li>

        {cart?.cartPayload?.Discount && (
          <li className="flex justify-between items center px-2 py-4 text-lime-500">
            <div className="flex flex-col">
              <span className="text-md font-bold">Promo Code</span>
              <span className="text-md">{cart?.cartPayload?.DiscountCode}</span>
            </div>
            <span className="text-xl">
              -&nbsp;
              {`${environment.CURRENCY_CODE} ${
                !isNaN(+cart?.cartPayload?.Discount)
                  ? cart?.cartPayload?.Discount.toFixed(2)
                  : "-"
              } ${environment.CURRENCY}`}
            </span>
          </li>
        )}

        <li className="flex justify-between items center px-2 py-4">
          <div className="flex flex-col">
            <span className="text-md font-bold">Total</span>
          </div>
          <span className="text-xl">
            {" "}
            {`${environment.CURRENCY_CODE} ${
              !isNaN(+cart?.cartPayload?.Total)
                ? cart?.cartPayload?.Total.toFixed(2)
                : "-"
            } ${environment.CURRENCY}`}
          </span>
        </li>
      </ul>
    </>
  );
}
