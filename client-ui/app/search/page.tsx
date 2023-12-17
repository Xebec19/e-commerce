"use client";

import SearchDialog from "@/components/search/search-dialog";

import { environment } from "@/lib";
import algoliasearch from "algoliasearch";
import { useState } from "react";

const algoliaClient = algoliasearch(
  environment.ALGOLIA_APPLICATION_KEY,
  environment.ALGOLIA_SEARCH_ONLY_KEY
);
const algoliaIndex = algoliaClient.initIndex(
  environment.ALGOLIA_INDEX_NAME + ""
);

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    try {
      console.log("hit");
      const { hits } = await algoliaIndex.search(query);
      console.log({ hits });
    } catch (error: any) {
      console.log(error.stack);
      setError(error.message);
    }
  };

  return (
    <article role="search">
      <div className="my-2 space-y-2">
        <div className="flex w-full max-w-sm items-center space-x-2">
          {/* <Input
            type="search"
            placeholder="Search Products"
            onClick={(e: any) => setQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            disabled={!!!query.trim()}
            onClick={handleSearch}
          >
            <Search />
          </Button> */}
          <SearchDialog />
        </div>
      </div>
    </article>
  );
}
