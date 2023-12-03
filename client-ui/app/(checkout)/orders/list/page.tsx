import Image from "next/image";
import OrderListHOC from "./order-list.hoc";

export default function Page() {
  return (
    <section role="orders list">
      <div className="flex justify-between">
        <h1 className="text-2xl prose font-bold">Your Orders</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="md:col-span-2">
          <OrderListHOC />
        </div>

        <div>
          <div className="relative aspect-square max-h-[400px] overflow-hidden w-full flex flex-col justify-center items-center">
            <Image
              fill
              className="object-contain h-full w-full transition-all ease-in-out"
              src="/thank-you.svg"
              sizes={"(min-width: 768px) 40vw, 100vw"}
              alt="Thank you! for you patronage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
