import NewArrivals from "@/components/carousel/new-arrivals";
import ThreeGridItems from "@/components/grid/three-grid-items";
import { IProductDetails } from "@/components/product/product-card";
import { DUMMY_PRODUCT_v1 } from "@/lib";
import { Suspense } from "react";

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  description: `Discover a world of endless shopping possibilities with our ${process.env.NEXT_PUBLIC_SITE_NAME} Shop the latest trends, find exclusive deals, and explore a vast selection of products from the comfort of your device.`,
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

const PRODUCTS: IProductDetails[] = Array(15).fill(DUMMY_PRODUCT_v1);

export default function Home() {
  return (
    <>
      <ThreeGridItems />
      <Suspense>
        <NewArrivals products={PRODUCTS} />
      </Suspense>
    </>
  );
}
