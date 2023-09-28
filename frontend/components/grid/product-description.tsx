import { Card } from "@/components/ui/card";
import ProductImages from "../carousel/product-images";
import ProductLabel from "../labels/product-label";
import { IProductDetails } from "../product/product-card";
import PriceLabel from "../labels/price-label";
import { Separator } from "../ui/separator";

const PRODUCT: IProductDetails = {
  name: "Product Name",
  price: 42,
  image: "/dummy-t-shirt.jpg",
  currency: "rupee",
  currencyCode: "$",
  size: "full",
  description:
    "Please note that these are the default ports for these email protocols, and your email service provider may use different ports. Additionally, secure versions of these protocols (SMTPS, POP3S, IMAPS) are recommended for enhanced security, as they encrypt your email communication. Always check with your email provider for the specific settings to use when configuring your email client or server.",
};

export default function ProductDescription() {
  return (
    <article role="product description">
      <Card className="grid grid-cols-1 md:grid-cols-3 p-4 dark:bg-black">
        <div className="h-[400px] col-span-2">
          <ProductImages />
        </div>
        <div>
          <h1 className="text-5xl font-medium mb-2">Product Title</h1>
          <div className="flex w-full">
            <PriceLabel payload={PRODUCT} />
          </div>
          <div className="py-4">
            <Separator />
          </div>
          <p className="py-4 prose">{PRODUCT.description}</p>
        </div>
      </Card>
    </article>
  );
}
