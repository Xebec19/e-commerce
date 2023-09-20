import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";

export default function ProductImages() {
  return (
    <div className="relative aspect-square max-h-[550] overflow-hidden w-full flex flex-col justify-center items-center">
      <Image
        fill
        className="object-contain h-full w-full"
        src="/dummy-t-shirt.jpg"
        sizes={"(min-width: 768px) 40vw, 100vw"}
        alt="dummy-t-shirt.jpg"
      />

      <div className="absolute bottom-4 block m-auto">
        <div className="rounded-full border-black p-2 bg-neutral-50 flex justify-center text-neutral-500 space-x-4 backdrop-blur dark:bg-black">
          <span className="hover:text-black dark:hover:text-white cursor-pointer hover:scale-110 transition-all ease-in-out">
            <ArrowLeft />
          </span>
          <Separator orientation="vertical" className="h-auto" color="white" />
          <span className="hover:text-black dark:hover:text-white cursor-pointer hover:scale-110 transition-all ease-in-out">
            <ArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
}
