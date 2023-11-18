import { IProductPayload } from "@/interfaces/product.interface";
import { environment } from "@/lib";

export default function PriceLabel({ payload }: { payload: IProductPayload }) {
  return (
    <div className="flex bg-blue-700 items-center rounded-full border px-2 py-1 text-white text-sm font-semibold dark:border-neutral-800">
      {`${environment.CURRENCY_CODE} ${payload.price} ${environment.CURRENCY}`}
    </div>
  );
}
