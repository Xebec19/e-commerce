import { IProductDetails } from "../product/product-card";

export default function PriceLabel({ payload }: { payload: IProductDetails }) {
  return (
    <div className="flex bg-blue-700 items-center rounded-full border px-2 py-1 text-white text-sm font-semibold dark:border-neutral-800">
      {`${payload.currencyCode} ${payload.price} ${payload.currency}`}
    </div>
  );
}
