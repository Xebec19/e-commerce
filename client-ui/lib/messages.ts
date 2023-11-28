export const errorMessage = {
  AboveQuantityLimit: "Oops! You can't increase the quantity beyond the limit",
  BelowQuantityLimit: "Oops! You can't decrease the quantity beyond the limit",
};

export const orderStatusHelperText = ({
  message,
}: {
  message: string;
}): string => {
  switch (message) {
    case "processing":
      return "Your order is currently being prepared and processed. Our team is working diligently to ensure that your items are ready for shipment.";
    case "confirmed":
      return "Great news! Your order has been confirmed, and we are now moving forward with the necessary steps to fulfill and dispatch it to your specified address.";
    case "delivered":
      return "Congratulations! Your order has been successfully delivered to the provided destination. We hope you enjoy your new items.";
    case "cancelled":
      return "Unfortunately, your order has been cancelled. If you have any concerns or need further assistance, please reach out to our customer support team.";
    case "pending_payment":
      return "Your order is awaiting payment confirmation. Please ensure that the payment process is completed to avoid any delays in processing your order.";
    case "refunded":
      return "A refund for your order has been processed successfully. The funds will be returned to your original payment method. If you have any questions, feel free to contact our support team.";
    default:
      return "Processing";
  }
};
