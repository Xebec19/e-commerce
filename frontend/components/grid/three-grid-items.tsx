import ProductCard from "../product/product-card";
import { IProductPayload } from "@/interfaces/product.interface";

export default function ThreeGridItems({
  products,
}: {
  products: IProductPayload[];
}) {
  return (
    <div className="mx-auto grid mx-w-screen-2xl gap-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          payload={product}
          sizes={"(min-width: 768px) 66vw, 100vw"}
        />
      ))}
    </div>
  );
}
