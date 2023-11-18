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
import { Menu, Power } from "lucide-react";
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
            <div className="items-center">
              <p>Link1</p>
            </div>
            <div className="items-center pt-2">
              <p>Link2</p>
            </div>

            {auth.authenticated && (
              <div className="flex items-center pt-2" onClick={handleLogout}>
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
