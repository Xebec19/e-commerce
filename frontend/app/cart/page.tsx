import CartForm from "@/components/forms/cart-form";
import CartList from "@/components/lists/cart-list";

export default function CartPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
      <section role="cart details">
        <CartList />
        <CartForm />
      </section>
    </div>
  );
}
