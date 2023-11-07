import CartListView from "@/components/cart/cart-list.component";
import BillingForm from "@/components/forms/billing-form";

export default function CartPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
      <section role="billing details" className="col-span-2">
        <BillingForm />
      </section>
      <CartListView />
    </div>
  );
}
