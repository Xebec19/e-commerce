import NewArrivals from "@/components/carousel/new-arrivals";
import ThreeGridItems from "@/components/grid/three-grid-items";
import { environment } from "@/lib";
import { fetchNewProducts, fetchTopProducts } from "@/lib/http/product.http";
import { Suspense } from "react";

export const metadata = {
  title: environment.SITE_NAME,
  description: `Discover a world of endless shopping possibilities with our ${environment.SITE_NAME} Shop the latest trends, find exclusive deals, and explore a vast selection of products from the comfort of your device.`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    images: [
      {
        url: "/icons8-shopaholic-color-96.png",
        width: 96,
        height: 96,
      },
    ],
  },
};

export default async function Home() {
  const products = await fetchNewProducts();

  let featuredProducts = products.slice(0, 3).map((product, index) => {
    if (index == 0) {
      product.is_featured = true;
    }

    return product;
  });

  let newProducts = products.slice(3);

  return (
    <>
      <ThreeGridItems products={featuredProducts} />
      <Suspense>
        <NewArrivals products={newProducts} />
      </Suspense>
    </>
  );
}
