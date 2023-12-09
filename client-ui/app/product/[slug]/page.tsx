import ProductImages from "@/components/carousel/product-images";
import PriceLabel from "@/components/labels/price-label";
import CartActions from "@/components/product/cart-actions.component";
import NewProducts from "@/components/product/new-products";
import ProductCard from "@/components/product/product-card";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getProduct,
  getProductImages,
  getSimilarItems,
} from "@/lib/http/product.http";
import { Metadata } from "next";
// TODO add json ld

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data: product } = await getProduct({ slug: params.slug });

  const indexable = product.payload.quantity.Int32 > 0;

  return {
    title: product.payload.product_name,
    description: product.payload.product_desc.String,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: productResponse } = await getProduct({ slug: params.slug });
  const { data: categoryResponse } = await getSimilarItems({
    slug: params.slug,
    page: 0,
    size: 15,
  });

  const { data: productImagesResponse } = await getProductImages({
    slug: params.slug,
  });

  return (
    <>
      <article role="product description">
        <Card className="grid grid-cols-1 md:grid-cols-3 p-4 dark:bg-black">
          <div className="h-[400px] col-span-2">
            <ProductImages images={productImagesResponse.payload} />
          </div>

          <div>
            <h1 className="text-5xl font-medium mb-2">
              {productResponse.payload.product_name}
            </h1>
            <div className="flex w-full">
              <PriceLabel payload={productResponse.payload} />
            </div>
            <div className="py-4">
              <Separator />
            </div>
            <p className="py-4 prose">
              {productResponse.payload.product_desc.String}
            </p>

            <CartActions product={productResponse.payload} />
          </div>
        </Card>
      </article>
      <div className="py-4">
        <h3 className="prose text-xl font-bold mb-2">Similar Products</h3>
        <section
          role="similar products"
          className="flex space-x-2 overflow-x-auto w-full"
        >
          {categoryResponse.payload.map((product, index) => (
            <div
              key={product.product_id}
              className="aspect-square w-[80vw] md:w-[33vw] h-[400px] border"
            >
              <ProductCard
                payload={product}
                sizes="(min-width: 768px) 33vw, 80vw"
              />
            </div>
          ))}
        </section>
      </div>

      <NewProducts />
    </>
  );
}
