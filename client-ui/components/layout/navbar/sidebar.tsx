import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useLogout from "@/hooks/use-logout";
import { RootState } from "@/store/redux.store";
import { Home, Menu, Package2, Power, Search } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export function Sidebar() {
  const handleLogout = useLogout();
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between items-stretch h-full">
          <Separator className="my-2" />
          <div className="space-y-2 flex-1 divide-y">
            <Link href={"/"} className="flex space-x-2 items-center py-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            <Link href={"/search"} className="flex space-x-2 items-center py-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>

            {auth.authenticated && (
              <Link
                href={"/orders/list"}
                className="flex space-x-2 items-center py-2"
              >
                <Package2 className="h-4 w-4" />
                <span>View Orders</span>
              </Link>
            )}

            {auth.authenticated && (
              <div className="flex items-center py-2" onClick={handleLogout}>
                <Power className="h-4 w-4 mr-2" />
                <p>Logout</p>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex py-2">
            <span>Terms & conditions</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
