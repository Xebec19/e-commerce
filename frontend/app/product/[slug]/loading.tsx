import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Layout() {
  return (
    <>
      <div>
        <Card className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 dark:bg-black">
          <div className="h-[400px] col-span-2">
            <div>
              <div className="relative aspect-square max-h-[400px] overflow-hidden w-full flex flex-col justify-center items-center">
                <Skeleton className="object-contain h-full w-full transition-all ease-in-out" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <Skeleton className="w-full mb-8 h-10" />

            <Skeleton className="w-full mb-2 h-full" />
          </div>
        </Card>
      </div>

      <div className="py-4">
        <Skeleton className="w-[50%] mb-8 h-10" />

        <div className="flex space-x-2 overflow-x-auto w-full">
          <Skeleton className="aspect-square w-[80vw] md:w-[33vw] h-[400px] border" />

          <Skeleton className="aspect-square w-[80vw] md:w-[33vw] h-[400px] border" />

          <Skeleton className="aspect-square w-[80vw] md:w-[33vw] h-[400px] border" />

          <Skeleton className="aspect-square w-[80vw] md:w-[33vw] h-[400px] border" />
        </div>
      </div>
    </>
  );
}
