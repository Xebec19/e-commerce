"use client";

import ProductCard from "@/components/product/product-card";
import NoSearchFound from "@/components/search/no-search-found";
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
import { IProductPayload } from "@/interfaces/product.interface";
import { querySearch, querySearchWithFilters } from "@/lib/algolia";
import { fetchCategories, fetchNewProducts } from "@/lib/http/product.http";
import { addSearch } from "@/store/search.slice";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [priceOrder, setPriceOrder] = useState<string>("order asc");
  const [selectedCat, setSelectedCat] = useState<string[]>([]);
  const [hits, setHits] = useState<IProductPayload[]>([]);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
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

  async function handleSearch() {
    let payload = {
      query,
      categories: selectedCat,
      order: [priceOrder],
    };

    const results = await querySearchWithFilters(payload);
    setHits(results);

    dispatch({ type: addSearch, payload: query });
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
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
          <div className="flex space-x-2">
            <Input
              placeholder="Search products"
              type="search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
            <Button variant={"ghost"} size={"icon"} onClick={handleSearch}>
              <Search />
            </Button>
          </div>

          {/* <div className="flex space-x-2 justify-start items-center"> */}
          <Select
            value={priceOrder}
            onValueChange={(value) => setPriceOrder(value)}
          >
            <SelectTrigger id="price" className="max-w-[11rem]">
              <SelectValue placeholder="Order by price" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="order asc">Price: Low to High</SelectItem>
                <SelectItem value="order desc">Price: High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* </div> */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hits.length > 0 ? (
            hits.map((hit) => (
              <div
                key={hit.product_id}
                className="aspect-square w-[80vw] md:w-[33vw] h-[400px] border"
              >
                <ProductCard
                  payload={hit}
                  sizes="(min-width: 768px) 33vw, 80vw"
                />
              </div>
            ))
          ) : (
            <div className="my-4 w-full flex justify-center items-center md:col-span-3">
              <NoSearchFound />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
