import { IProductPayload } from "@/interfaces/product.interface";
import { environment } from "@/lib";

export default function ProductLabel({
  payload,
}: {
  payload: IProductPayload;
}) {
  return (
    <div className="flex dark:bg-black/70 bg-white/70 items-center rounded-full border p-1 text-xs font-semibold text-black  dark:border-neutral-800 dark:text-white">
      {payload.product_name}
      <div className="flex bg-blue-700 ml-1 items-center rounded-full border px-2 py-1 text-white text-xs font-semibold dark:border-neutral-800">
        {`${environment.CURRENCY_CODE} ${(+payload.price.Int32 ?? 0).toFixed(
          2
        )}`}
      </div>
    </div>
  );
}
