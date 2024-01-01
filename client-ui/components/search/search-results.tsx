import { IProductPayload } from "@/interfaces/product.interface";
import { ellipsis, environment } from "@/lib";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function SearchResults({
  results,
  handleSelect,
}: {
  results: IProductPayload[];
  handleSelect: (product: IProductPayload) => void;
}) {
  return (
    <div className="my-2 space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-foreground">Search Results</span>
        <Link href={"/search"} className="text-sm hidden md:block">
          View all
        </Link>
      </div>

      <div className="divide-y">
        {results?.map((product) => (
          <div
            key={product.product_id}
            className="flex py-2 cursor-pointer"
            onClick={() => handleSelect(product)}
          >
            <div className="relative aspect-square max-w-[100px] max-h-[100px] overflow-hidden w-full flex flex-col justify-center items-center">
              <Image
                src={product.image_url}
                className="object-contain h-full w-full transition-all ease-in-out"
                fill
                sizes="(max-width: 768px) 80px, 100px"
                alt={product.product_name}
              />
            </div>

            <div className="flex flex-col px-2 space-y-2 items-stretch text-sm">
              <span>{product.product_name}</span>
              <span className="text-xs">
                <Badge variant={"default"}>{product.category_name}</Badge>
              </span>
              <span className="text-foreground text-sm">
                {ellipsis(product.product_desc.String, 28)}
              </span>
              <span>{`${
                environment.CURRENCY_CODE
              } ${product.price.Int32.toFixed(2)} ${
                environment.CURRENCY
              }`}</span>
            </div>
          </div>
        ))}
      </div>
      {!results?.length && (
        <div className="w-full text-foreground text-sm">No Results Found!</div>
      )}
    </div>
  );
}
