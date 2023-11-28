import { useToast } from "@/components/ui/use-toast";
import { ICreateOrderRequest } from "@/interfaces/order.interface";
import { environment } from "@/lib";
import { confirmOrder, createOrder } from "@/lib/http/order.http";
import { RootState } from "@/store/redux.store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
declare var Razorpay: any;

export default function useCheckout() {
  const router = useRouter();
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
        order_id: response.data.payload.orderId,
        amount: response.data.payload.total * 100, // convert to paise
        currency: environment.CURRENCY,
        name: environment.SITE_NAME,
        image: environment.LOGO + "",
        description: `Payment for ${response.data.payload.orderId}`,
        handler: async function (response: any) {
          try {
            let payload = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            };
            const resp = await confirmOrder({ payload });

            if (!resp.data.payload.status) {
              throw new Error("Request failed!");
            }

            router.push(`/order/${payload.orderId}`);
            return;
          } catch (error: any) {
            toast({
              variant: "destructive",
              title: "Payment failed",
              description:
                "Please try again later. Error: " +
                error.message +
                " | " +
                error?.response?.data?.message +
                " | " +
                error?.response?.data?.error +
                " | " +
                error?.response?.data?.error_description +
                " | " +
                error?.response?.data?.error_code,
            });
          }
        },
        prefill: {
          name: payload.billingFirstName,
          email: payload.billingEmail,
          contact: payload.billingPhone,
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
