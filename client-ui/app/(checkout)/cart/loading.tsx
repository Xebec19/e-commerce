import CartViewComponent from "@/components/cart/cart-view.component";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartPage() {
  return (
    <section role="cart details">
      <Skeleton className="h-8 w-[200px] rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="flex flex-col space-y-2 md:space-y-4">
          <div className="flex items center space-x-4 md:space-x-8">
            <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-full" />
            <div className="flex flex-col justify-center space-y-2">
              <Skeleton className="h-4 w-[150px] md:w-[200px]" />
              <Skeleton className="h-4 w-[200px] md:w-[250px]" />
            </div>
          </div>

          <div className="flex items center space-x-4 md:space-x-8">
            <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-full" />
            <div className="flex flex-col justify-center space-y-2">
              <Skeleton className="h-4 w-[150px] md:w-[200px]" />
              <Skeleton className="h-4 w-[200px] md:w-[250px]" />
            </div>
          </div>

          <div className="flex items center space-x-4 md:space-x-8">
            <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-full" />
            <div className="flex flex-col justify-center space-y-2">
              <Skeleton className="h-4 w-[150px] md:w-[200px]" />
              <Skeleton className="h-4 w-[200px] md:w-[250px]" />
            </div>
          </div>

          <div className="flex items center space-x-4 md:space-x-8">
            <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-full" />
            <div className="flex flex-col justify-center space-y-2">
              <Skeleton className="h-4 w-[150px] md:w-[200px]" />
              <Skeleton className="h-4 w-[200px] md:w-[250px]" />
            </div>
          </div>
        </div>

        <Skeleton className="h-[350px]" />
      </div>
    </section>
  );
}
