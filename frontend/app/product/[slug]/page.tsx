import ProductDescription from "@/components/grid/product-description";
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

export default function ProductPage() {
  return (
    <>
      <ProductDescription />
    </>
  );
}
