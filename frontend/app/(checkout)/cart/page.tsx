import CartSummary from "@/components/forms/cart-summary";
import CartListEdit from "@/components/lists/cart-list-edit";

export default function CartPage() {
  return (
    <section role="cart details">
      <h1 className="text-2xl prose font-bold">Your cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <CartListEdit />
        <CartSummary />
      </div>
    </section>
  );
}
