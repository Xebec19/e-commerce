"use client";

import ProductCard from "@/components/product/product-card";
import AlgoliaRefer from "@/components/search/algolia-refer";
import NoSearchFound from "@/components/search/no-search-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IProductPayload } from "@/interfaces/product.interface";
import { querySearchWithFilters } from "@/lib/algolia";
import { fetchCategories, fetchNewProducts } from "@/lib/http/product.http";
import { addSearch } from "@/store/search.slice";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const [query, setQuery] = useState<string>("");
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

  const handleSearch = useCallback(async () => {
    let payload = {
      query,
      categories: selectedCat,
    };

    const results = await querySearchWithFilters(payload);
    setHits(results);

    if (!!query) {
      dispatch({ type: addSearch, payload: query });
    }
  }, [dispatch, query, selectedCat]);

  function clearFilters() {
    setSelectedCat([]);
  }

  useEffect(() => {
    let params = new URLSearchParams();
    // params.append("order", priceOrder);
    params.append("category", selectedCat.toString());

    router.push(pathname + "?" + params.toString());
  }, [router, pathname, selectedCat]);

  useEffect(() => {
    let categoryParams = searchParams.get("category");
    if (categoryParams) {
      setSelectedCat(categoryParams.split(","));
      handleSearch();
    }
  }, [searchParams]);

  return (
    <article role="search">
      <div className="my-2 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="prose text-xl font-bold mb-2">Search</h3>
          <AlgoliaRefer />
        </div>
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
          <Button
            variant={"ghost"}
            className="min-w-[11rem]"
            disabled={!selectedCat.length}
            onClick={clearFilters}
          >
            <X className="w-4 h-4" />
            &nbsp; Clear all filters
          </Button>
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
                className="aspect-square w-[80vw] md:w-[33vw] h-[400px] border relative"
              >
                <ProductCard
                  payload={hit}
                  sizes="(min-width: 768px) 25vw, 80vw"
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
