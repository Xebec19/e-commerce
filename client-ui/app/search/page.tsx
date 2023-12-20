"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("asc");

  return (
    <article role="search">
      <div className="my-2 space-y-2">
        <h3 className="prose text-xl font-bold mb-2">Search</h3>
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Input placeholder="Search products" type="search" />
            <Button variant={"ghost"} size={"icon"}>
              <Search />
            </Button>
          </div>

          <div className="flex space-x-2 justify-center items-center">
            <Select>
              <SelectTrigger id="price">
                <SelectValue placeholder="Order by price" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="asc">Price: Low to High</SelectItem>
                  <SelectItem value="desc">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
      </div>
    </article>
  );
}
