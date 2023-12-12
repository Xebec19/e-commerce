"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCategories } from "@/lib/http/product.http";
import { useQuery } from "@tanstack/react-query";

export default function SearchFiltersDropDown() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div className="flex flex-col space-y-4 my-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" className="w-full" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((ctg) => (
            <SelectItem key={ctg.category_id} value={ctg.category_name}>
              {ctg.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Filters" className="w-full" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="trending">Trending</SelectItem>
          <SelectItem value="latest">Latest Arrivals</SelectItem>
          <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
          <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
