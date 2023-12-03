import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { formatRelative } from "date-fns";
import { HelpCircle, Mail, MapPin, Phone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { orderStatusHelperText } from "@/lib/messages";

export const OrderListSchema = z.object({
  orderId: z.string(),
  //   userId: z.number(),
  price: z.number(),
  deliveryPrice: z.number(),
  total: z.number(),
  status: z.string(),
  createdOn: z.string(),
  shippingFirstName: z.string(),
  shippingLastName: z.string(),
  shippingEmail: z.string(),
  shippingAddress: z.string(),
  shippingPhone: z.string(),
  discountCode: z.string(),
  discountAmount: z.number(),
});

export default function OrderListItem({
  order,
}: {
  order: z.infer<typeof OrderListSchema>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <h3 className="text-xl font-medium uppercase">{order.orderId}</h3>

          <div className="flex space-x-2 items-center cursor-pointer">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-sm break-words bg-background p-2 rounded-md">
                    {orderStatusHelperText({
                      message: order.status + "",
                    })}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xl prose uppercase font-medium">
              {order.status}
            </span>
          </div>
        </CardTitle>
        <CardDescription>
          <p className="text-sm text-muted-foreground">
            {formatRelative(new Date(order.createdOn), new Date())}
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="divide-y-2 space-y-2">
          <div className="flex items-center space-x-2 py-2">
            <Mail /> <span>{order.shippingEmail}</span>
          </div>

          <div className="flex items-center space-x-2 py-2">
            <Phone /> <span>{order.shippingPhone}</span>
          </div>

          <div className="flex items-center space-x-2 py-2">
            <MapPin /> <span>{order.shippingAddress}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
