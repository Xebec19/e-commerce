import Image from "next/image";

export interface IProductDetails {
  name: string;
  price: number;
  image: string;
  currency: string;
  currencyCode: string;
  size: "full" | "half";
}

export default function ProductCard({ payload }: { payload: IProductDetails }) {
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
        sizes={
          payload.size === "full"
            ? "(min-width: 768px) 66vw, 100vw"
            : "(min-width: 700px) 33vw, 100vw"
        }
      />
    </div>
  );
}
