import { DUMMY_PRODUCT_v1, DUMMY_PRODUCT_v2 } from "@/lib";
import ProductCard from "../product/product-card";

export default function ThreeGridItems() {
  return (
    <div className="mx-auto grid mx-w-screen-2xl gap-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ProductCard
        payload={DUMMY_PRODUCT_v1}
        sizes={"(min-width: 768px) 66vw, 100vw"}
      />
      <ProductCard
        payload={DUMMY_PRODUCT_v2}
        sizes="(min-width: 768px) 33vw, 100vw"
      />
      <ProductCard
        payload={DUMMY_PRODUCT_v2}
        sizes="(min-width: 768px) 33vw, 100vw"
      />
    </div>
  );
}
