"use client";

import { LogIn, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import { environment } from "@/lib";
import Link from "next/link";
import { RootState } from "@/store/redux.store";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function MobileHeader() {
  const auth = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  return (
    <nav className="flex justify-between p-4 items-center">
      <Sidebar />
      <span className="flex items-center justify-center space-x-4">
        <Link href={"/"} className="flex space-x-4 items-center">
          <Image
            priority
            src={environment.LOGO + ""}
            width={30}
            height={30}
            alt={environment.SITE_NAME + ""}
          />
          <span className="font-medium">{environment.SITE_NAME}</span>
        </Link>
      </span>
      <div className="space-x-2">
        {!pathname.includes("search") ? (
          <Link href={"/search"}>
            <Button variant="outline" size="icon">
              <Search />
            </Button>
          </Link>
        ) : (
          <></>
        )}
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
      </div>
    </nav>
  );
}
