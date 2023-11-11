"use client";

import SearchInput from "@/components/search/search-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { environment } from "@/lib";
import {
  LogIn,
  MoreHorizontal,
  Package2,
  Power,
  ShoppingCart,
  User,
} from "lucide-react";
import Image from "next/image";
import { fetchCategories } from "@/lib/http/product.http";
import Link from "next/link";
import { ICategoryPayload } from "@/interfaces/product.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux.store";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenuGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/hooks/use-logout";

export default function DesktopHeader() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleLogout = useLogout();

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
        {auth.authenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem className="space-x-2">
                  <User className="h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="space-x-2">
                  <Package2 className="h-4 w-4" />
                  <span>View Orders</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="space-x-2" onClick={handleLogout}>
                  <Power className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </span>
    </nav>
  );
}
