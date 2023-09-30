import CartListEdit from "@/components/lists/cart-list-edit";

export default function CartPage() {
  return (
    <section role="cart details">
      <h1 className="text-2xl prose font-bold">Your cart</h1>
      <CartListEdit />
    </section>
  );
}
