"use client";

import { Badge } from "@/components/ui/badge";
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
import { fetchCategories } from "@/lib/http/product.http";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [priceOrder, setPriceOrder] = useState<string>("asc");
  const [selectedCat, setSelectedCat] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const categoriesParam = searchParams.getAll("category");
  const order = searchParams.get("order");
  const pathname = usePathname();
  const router = useRouter();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categoryNames = new Set(categories?.map((cat) => cat.category_name));

  function handleSelectCategory(categoryName: string) {
    if (selectedCat.includes(categoryName)) {
      setSelectedCat(selectedCat.filter((cat) => cat !== categoryName));
    } else {
      setSelectedCat([...selectedCat, categoryName]);
    }
  }

  useEffect(() => {
    let params = new URLSearchParams();
    params.append("order", priceOrder);
    params.append("category", selectedCat.toString());

    router.push(pathname + "?" + params.toString());
  }, [priceOrder, router, pathname, selectedCat]);

  return (
    <article role="search">
      <div className="my-2 space-y-2">
        <h3 className="prose text-xl font-bold mb-2">Search</h3>
        <div className="flex flex-col md:flex-row space-y-2 justify-between">
          <div className="flex space-x-2">
            <Input placeholder="Search products" type="search" />
            <Button variant={"ghost"} size={"icon"}>
              <Search />
            </Button>
          </div>

          <div className="flex space-x-2 justify-start items-center">
            <Select
              value={priceOrder}
              onValueChange={(value) => setPriceOrder(value)}
            >
              <SelectTrigger id="price" className="max-w-[11rem]">
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

        <div className="flex space-x-2 overflow-x-auto whitespace-nowrap">
          {Array.from(categoryNames)?.map((category) => (
            <Badge
              key={category}
              variant={selectedCat.includes(category) ? "default" : "outline"}
              onClick={() => handleSelectCategory(category)}
              className="cursor-pointer"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
      </div>
    </article>
  );
}
