import { SITE_NAME } from "@/lib/environment";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";

export default function MobileHeader() {
  return (
    <div className="flex justify-between p-4 items-center">
      <Sidebar />
      <span className="flex items-center justify-center space-x-4">
        <Image
          priority
          src="/icons8-shopaholic-48.png"
          width={30}
          height={30}
          alt={SITE_NAME + ""}
        />
        <span className="font-medium">E commerce</span>
      </span>
      <Button variant="outline">
        <ShoppingCart />
      </Button>
    </div>
  );
}
