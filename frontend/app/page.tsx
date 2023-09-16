import Carousel from "@/components/carousel";
import ThreeGridItems from "@/components/grid/three-grid-items";
import { IProductDetails } from "@/components/product/product-card";
import { DUMMY_PRODUCT_v1, DUMMY_PRODUCT_v2 } from "@/lib";
import { Suspense } from "react";

export const metadata = {
  description: "High-performance e-commerce store built with Next.js",
  openGraph: {
    type: "website",
  },
};

const PRODUCTS: IProductDetails[] = Array(15).fill(DUMMY_PRODUCT_v1);

export default function Home() {
  return (
    <main>
      <ThreeGridItems />
      <Suspense>
        <Carousel products={PRODUCTS} />
      </Suspense>
    </main>
  );
}
