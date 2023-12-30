"use client";

import { useEffect, useState } from "react";
import { History, Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { querySearch } from "@/lib/algolia";
import { IProductPayload } from "@/interfaces/product.interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/redux.store";
import { addSearch, removeSearch } from "@/store/search.slice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { ellipsis, environment } from "@/lib";
import { Badge } from "../ui/badge";
import Link from "next/link";
import RecentSearches from "./recent-searches";
import SearchResults from "./search-results";
import { encode } from "punycode";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

var timer: any;

export default function SearchDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<IProductPayload[]>([]);
  const lastSearches = useSelector(
    (state: RootState) => state.searches.searches
  );
  const router = useRouter();
  const dispatch = useDispatch();

  function handleRemoveSearch(idx: number) {
    dispatch({ type: removeSearch, payload: idx });
  }

  function handleInput(qry: string) {
    setQuery(qry);

    debounce(qry);
  }

  function handleSearch(qry: string) {
    if (!!!qry) {
      return;
    }

    querySearch(qry).then((res) => {
      setResults(res);
      dispatch({ type: addSearch, payload: qry });
    });
  }

  function visitProduct(product: IProductPayload) {
    let url = encodeURIComponent(
      product.product_name.toLowerCase() + "_" + product.product_id
    );
    setOpen(false);
    router.push(`/product/${url}`);
  }

  // below func clears last timer and sets a new timer to trigger after 500ms
  function debounce(value: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch(value);
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <div className="flex space-x-2">
          <Input
            type="search"
            placeholder="Search Products"
            className="w-full hidden md:block md:min-w-[20rem]"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e.target.value)
            }
          />
          <Button variant={"ghost"} size={"icon"}>
            <Search />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col space-y-2">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e.target.value)
            }
          />
          <div className="overflow-y-auto max-h-[50vh]">
            <RecentSearches
              searches={lastSearches}
              handleSelect={(qry: string) => handleInput(qry)}
              handleRemove={(idx: number) => handleRemoveSearch(idx)}
            />
            <SearchResults
              results={results.slice(0, 5)}
              handleSelect={visitProduct}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
