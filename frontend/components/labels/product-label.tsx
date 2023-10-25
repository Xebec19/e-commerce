import { IProductDetails } from "../product/product-card";

export default function ProductLabel({
  payload,
}: {
  payload: IProductDetails;
}) {
  return (
    <div className="flex dark:bg-black/70 bg-white/70 items-center rounded-full border p-1 text-xs font-semibold text-black  dark:border-neutral-800 dark:text-white">
      {payload.name}
      <div className="flex bg-blue-700 ml-1 items-center rounded-full border px-2 py-1 text-white text-xs font-semibold dark:border-neutral-800">
        {`${payload.currencyCode} ${payload.price}`}
      </div>
    </div>
  );
}
