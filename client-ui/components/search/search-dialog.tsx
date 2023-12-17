"use client";

import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { History, Search, User } from "lucide-react";
import { Input } from "../ui/input";
import algoliaIndex from "@/lib/algolia";
import { IProductPayload } from "@/interfaces/product.interface";

var timer: any;

type HitProps = {
  objectID: string;
  product_name: string;
  product_id: number;
  image_url: string;
  quantity: number;
  price: number;
  delivery_price: number;
  product_desc: string;
  gender: string;
  category_name: string;
  created_on: string;
};

function translateHit(hit: HitProps) {
  return {
    product_id: hit.product_id,
    product_name: hit.product_name,
    product_desc: { String: hit.product_desc, Valid: true },
    price: { Int32: hit.price, Valid: true },
    delivery_price: { Int32: hit.delivery_price, Valid: true },
    image_url: hit.image_url,
    quantity: { Int32: hit.quantity, Valid: true },
  };
}

export default function SearchDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [results, setResults] = useState<IProductPayload[]>([]);

  async function handleSearch(query: string) {
    const { hits } = await algoliaIndex.search(query);
    const temp = hits.map((hit: any) => ({
      product_id: hit.product_id,
      product_name: hit.product_name,
      product_desc: { String: hit.product_desc, Valid: true },
      price: { Int32: hit.price, Valid: true },
      delivery_price: { Int32: hit.delivery_price, Valid: true },
      image_url: hit.image_url,
      quantity: { Int32: hit.quantity, Valid: true },
    }));

    setResults(temp);
  }

  // below func clears last timer and sets a new timer to trigger after 500ms
  function debounce(value: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch(value);
    }, 500);
  }

  return (
    <>
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search Products"
          className="relative"
          onClick={() => setOpen(true)}
        />
        <Search className="absolute right-4 top-3 h-4 w-4" />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={debounce}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent Searches">
            <CommandItem>
              <History className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <History className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <History className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Results">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>

            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>

            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
