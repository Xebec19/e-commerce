import Image from "next/image";

export interface IProductDetails {
  name: string;
  price: number;
  image: string;
  currency: string;
  currencyCode: string;
  size: "full" | "half";
}

function Label({ payload }: { payload: IProductDetails }) {
  return (
    <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
      <div className="flex dark:bg-black/70 bg-white/70 items-center rounded-full border p-1 text-xs font-semibold text-black  dark:border-neutral-800 dark:text-white">
        {payload.name}
        <div className="flex bg-blue-700 ml-1 items-center rounded-full border px-2 py-1 text-xs font-semibold text-black  dark:border-neutral-800 dark:text-white">
          {`${payload.currencyCode} ${payload.price}`}
        </div>
      </div>
    </div>
  );
}

export default function ProductCard({
  payload,
  sizes,
}: {
  payload: IProductDetails;
  sizes: string;
}) {
  return (
    <div
      className={`group aspect-square flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800 ${
        payload.size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }`}
    >
      <Image
        className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
        src={payload.image}
        fill
        alt={payload.name}
        sizes={sizes}
      />
      <Label payload={payload} />
    </div>
  );
}
