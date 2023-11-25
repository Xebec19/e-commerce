import { environment } from "@/lib";
declare var Razorpay: any;

export default function useCheckout() {
  const handleCheckout = () => {
    var options = {
      key: environment.RAZORPAY_KEY,
      amount: 500,
      currency: environment.CURRENCY,
      name: "test",
      description: "Test description",
      image: "",
      order_id: "",
      handler: function (response: any) {
        console.log({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: "Rohan",
        email: "rohan@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response: any) {
      console.log({ response });
    });

    return rzp1.open();
  };

  return handleCheckout;
}
