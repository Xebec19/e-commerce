import { useToast } from "@/components/ui/use-toast";
import { ICreateOrderRequest } from "@/interfaces/order.interface";
import { environment } from "@/lib";
import { createOrder } from "@/lib/http/order.http";
import { RootState } from "@/store/redux.store";
import { useSelector } from "react-redux";
declare var Razorpay: any;

export default function useCheckout() {
  const checkOutDetails = useSelector((state: RootState) => state.checkout);
  const { toast } = useToast();

  const payload: ICreateOrderRequest = {
    billingFirstName: checkOutDetails.billingAddress.firstName,
    billingLastName: checkOutDetails.billingAddress.lastName + "",
    billingEmail: checkOutDetails.billingAddress.email,
    billingAddress: checkOutDetails.billingAddress.address,
    billingPhone: checkOutDetails.billingAddress.phoneNum,
    shippingFirstName: checkOutDetails.shippingAddress.firstName,
    shippingLastName: checkOutDetails.shippingAddress.lastName + "",
    shippingEmail: checkOutDetails.shippingAddress.email,
    shippingAddress: checkOutDetails.shippingAddress.address,
    shippingPhone: checkOutDetails.shippingAddress.phoneNum,
  };

  const handleCheckout = async () => {
    try {
      const response = await createOrder({ payload });

      if (!response.data.status) {
        throw new Error("Request failed!");
      }

      var options = {
        key: environment.RAZORPAY_KEY,
        amount: response.data.payload.total,
        currency: environment.CURRENCY,
        name: environment.SITE_NAME,
        image:
          "https://ecommerce-rohan-admin.s3.ap-south-1.amazonaws.com/aiony-haust-3TLl_97HNJo-unsplash.jpg",
        order_id: "order_9A33XWu170gUtm",
        description: `Payment for ${response.data.payload.orderId}`,
        callback_url: "http://localhost:3000/",
        handler: function (response: any) {
          console.log({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: payload.billingFirstName,
          email: payload.billingEmail,
          contact: payload.billingPhone,
        },
        notes: {
          address: environment.ADDRESS,
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log({ options });

      var rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        toast({
          variant: "destructive",
          title: "Payment failed",
          description: response.message,
        });
        console.log({ response });
      });

      return rzp1.open();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: error.message,
      });

      console.log({ error });
    }
  };

  return handleCheckout;
}
