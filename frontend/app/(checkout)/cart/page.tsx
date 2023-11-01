import CartViewComponent from "@/components/cart/cart-view.component";

export default function CartPage() {
  return (
    <section role="cart details">
      <h1 className="text-2xl prose font-bold">Your cart</h1>
      <CartViewComponent />
    </section>
  );
}
