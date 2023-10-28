"use client";

import SearchInput from "@/components/search/search-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { environment } from "@/lib";
import { LogIn, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { fetchCategories } from "@/lib/http/product.http";
import Link from "next/link";
import { ICategoryPayload } from "@/interfaces/product.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux.store";
import { useQuery } from "@tanstack/react-query";

export default function DesktopHeader() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const auth = useSelector((state: RootState) => state.auth);

  return (
    <nav className="flex justify-between p-4 items-center container">
      <span className="flex items-center space-x-4">
        <Link href={"/"} className="flex space-x-4 items-center">
          <Image
            priority
            src="/icons8-shopaholic-48.png"
            width={40}
            height={40}
            alt={environment.SITE_NAME + ""}
          />
          <span className="text-lg font-bold">{environment.SITE_NAME}</span>
        </Link>
        <span className="space-x-2 flex">
          {categories?.slice(0, 2).map((category: ICategoryPayload) => (
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
        {auth.authenticated ? (
          <Link href={"/cart"}>
            <Button variant="outline" size="icon">
              <ShoppingCart />
            </Button>
          </Link>
        ) : (
          <Link href={"/auth/login"}>
            <Button variant="outline" size="icon">
              <LogIn />
            </Button>
          </Link>
        )}
      </span>
    </nav>
  );
}
