import SearchInput from "@/components/search/search-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { environment } from "@/lib";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { fetchCategories } from "@/lib/http/product.http";
import Link from "next/link";
import { ICategoryPayload } from "@/interfaces/product.interface";

export default async function DesktopHeader() {
  const { payload } = await fetchCategories();

  return (
    <nav className="flex justify-between p-4 items-center container">
      <span className="flex items-center space-x-4">
        <Image
          priority
          src="/icons8-shopaholic-48.png"
          width={40}
          height={40}
          alt={environment.SITE_NAME + ""}
        />
        <span className="text-lg font-bold">{environment.SITE_NAME}</span>
        <span className="space-x-2 flex">
          {payload.slice(0, 2).map((category: ICategoryPayload) => (
            <Link
              key={category.category_id}
              href={`search?category=${category.category_id}`}
            >
              {category.category_name}
            </Link>
          ))}
        </span>
      </span>
      <SearchInput />
      <span className="space-x-2 flex">
        <ThemeToggle />
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
      </span>
    </nav>
  );
}
