import Image from "next/image";
import ProductLabel from "../labels/product-label";
import { IProductPayload } from "@/interfaces/product.interface";
import Link from "next/link";

export default function ProductCard({
  payload,
  sizes,
}: {
  payload: IProductPayload;
  sizes: string;
}) {
  let slug = encodeURIComponent(
    `${payload.product_name.toLowerCase()}_${payload.product_id}`
  );

  return (
    <div
      className={`group aspect-square flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800 ${
        payload.is_featured
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }`}
    >
      {" "}
      <Link href={`/product/${slug}`}>
        <Image
          className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
          src={payload.image_url}
          fill
          alt={payload.product_name}
          sizes={sizes}
        />
        <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
          <ProductLabel payload={payload} />
        </div>
      </Link>
    </div>
  );
}
