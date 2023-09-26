import { Card } from "@/components/ui/card";
import ProductImages from "../carousel/product-images";

export default function ProductDescription() {
  return (
    <Card className="grid grid-cols-1 md:grid-cols-3 p-4 dark:bg-black">
      <div className="h-[400px] col-span-2">
        <ProductImages />
      </div>
      <div className="h-[400]">hello world</div>
    </Card>
  );
}
