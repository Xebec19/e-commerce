import BillingForm from "@/components/forms/billing-form";
import CouponForm from "@/components/forms/coupon-form";
import CartList from "@/components/lists/cart-list";

export default function CartPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
      <section role="billing details" className="col-span-2">
        <BillingForm />
      </section>
      <section role="cart details">
        <CartList />
        <CouponForm />
      </section>
    </div>
  );
}
