import CartViewComponent from "@/components/cart/cart-view.component";
import { environment } from "@/lib";

export const metadata = {
  title: "Cart | " + environment.SITE_NAME,
  description: `Discover a world of endless shopping possibilities with our ${environment.SITE_NAME} Shop the latest trends, find exclusive deals, and explore a vast selection of products from the comfort of your device.`,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: "website",
    images: [
      {
        url: "https://ecommerce-rohan-admin.s3.ap-south-1.amazonaws.com/khushi-logo1.png",
        width: 96,
        height: 96,
      },
    ],
  },
};

export default function CartPage() {
  return (
    <section role="cart details">
      <h1 className="text-2xl prose font-bold">Your cart</h1>
      <CartViewComponent />
    </section>
  );
}
