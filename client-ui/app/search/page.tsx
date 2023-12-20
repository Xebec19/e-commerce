"use client";

import { useState } from "react";
import SearchDialog from "@/components/search/search-dialog";
import { Slider } from "@/components/ui/slider";

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  return (
    <article role="search">
      <div className="my-2 space-y-2">
        <h3 className="prose text-xl font-bold mb-2">Search</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background h-full border p-2 md:px-4">
            <div></div>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>

          <div className="md:col-span-2">Search pages</div>
        </div>
      </div>
    </article>
  );
}
