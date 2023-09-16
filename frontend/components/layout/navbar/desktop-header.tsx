import SearchInput from "@/components/search/search-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { environment } from "@/lib";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function DesktopHeader() {
  return (
    <nav className="flex justify-between p-4 items-center">
      <span className="flex items-center space-x-4">
        <Image
          priority
          src="/icons8-shopaholic-48.png"
          width={40}
          height={40}
          alt={environment.SITE_NAME + ""}
        />
        <span className="text-lg font-bold">{environment.SITE_NAME}</span>
        <span className="space-x-2">
          <span className="text-md cursor-pointer">Category 1</span>
          <span className="text-md cursor-pointer">Category 1</span>
        </span>
      </span>
      <SearchInput />
      <span className="space-x-2">
        <ThemeToggle />
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
      </span>
    </nav>
  );
}
