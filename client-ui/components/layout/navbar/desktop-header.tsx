"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { environment } from "@/lib";
import {
  LogIn,
  MoreHorizontal,
  Package2,
  Power,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { fetchCategories } from "@/lib/http/product.http";
import Link from "next/link";
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
import SearchDialog from "@/components/search/search-dialog";
import { usePathname } from "next/navigation";

export default function DesktopHeader() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const pathname = usePathname();

  const handleLogout = useLogout();

  const auth = useSelector((state: RootState) => state.auth);

  return (
    <nav className="flex justify-between p-4 items-center container">
      <span className="flex items-center space-x-4">
        <Link href={"/"} className="flex space-x-4 items-center">
          <Image
            priority
            src={environment.LOGO + ""}
            width={40}
            height={40}
            alt={environment.SITE_NAME + ""}
          />
          <span className="text-lg font-bold">{environment.SITE_NAME}</span>
        </Link>
        <span className="space-x-2 flex">
          {categories?.slice(0, 2).map((category) => (
            <Link
              key={category.category_id}
              href={`/search?category=${category.category_name}`}
            >
              {category.category_name}
            </Link>
          ))}
        </span>
      </span>
      {!pathname.includes("search") && <SearchDialog />}
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
                {/* <DropdownMenuItem className="space-x-2">
                  <User className="h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem> */}

                <DropdownMenuItem>
                  <Link href={"/orders/list"} className="flex space-x-2">
                    <Package2 className="h-4 w-4" />
                    <span>View Orders</span>
                  </Link>
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
