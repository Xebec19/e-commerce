import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SearchInput() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search Products" />
      <Button variant="ghost">
        <Search />
      </Button>
    </div>
  );
}
