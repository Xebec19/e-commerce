import CartListView from "@/components/cart/cart-list.component";
import ShippingForm from "@/components/forms/shipping-form";

export default function CartPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
      <section role="billing details" className="col-span-2">
        <ShippingForm />
      </section>
      <CartListView />
    </div>
  );
}
