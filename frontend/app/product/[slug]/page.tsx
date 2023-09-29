import ProductDescription from "@/components/grid/product-description";
import ProductCard from "@/components/product/product-card";
import { DUMMY_PRODUCT_v1, DUMMY_PRODUCT_v2 } from "@/lib";
import { Metadata } from "next";

// TODO add json ld

const HIDDEN_PRODUCT_TAG = "hidden";

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  // const product = await getProduct(params.handle);

  // if (!product) return notFound();
  const product = {
    featuredImage: {
      url: "/dummy-t-shirt.jpg",
      width: "400px",
      height: "400px",
      altText: "Product Name",
    },
    tags: ["awesome", "great"],
    title: "Product Name",
    seo: {
      title: "Product Name",
      description: "Some description",
    },
    description: "Some awesome product description",
  };

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

const SIMILAR_PRODUCTS = new Array(15).fill(DUMMY_PRODUCT_v2);

export default function ProductPage() {
  return (
    <>
      <ProductDescription />
      <div className="py-4">
        <h3 className="prose text-xl font-bold mb-2">Similar Products</h3>
        <div className="flex space-x-2 overflow-x-auto w-full">
          {/* {SIMILAR_PRODUCTS.map((product, index: number) => (
            <ProductCard
              key={product.url + index}
              payload={DUMMY_PRODUCT_v2}
              sizes="(min-width: 768px) 33vw, 80vw"
            />
          ))} */}
          {SIMILAR_PRODUCTS.map((product, index) => (
            <div
              key={product.url + index}
              className="aspect-square w-[80vw] md:w-[33vw] h-[400px] border"
            >
              <ProductCard
                payload={DUMMY_PRODUCT_v1}
                sizes="(min-width: 768px) 33vw, 80vw"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
