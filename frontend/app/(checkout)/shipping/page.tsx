import CartForm from "@/components/forms/cart-form";
import ShippingForm from "@/components/forms/shipping-form";
import CartList from "@/components/lists/cart-list";

export default function CartPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
      <section role="billing details" className="col-span-2">
        <ShippingForm />
      </section>
      <section role="cart details">
        <CartList />
        <CartForm />
      </section>
    </div>
  );
}
