"use client";

// todo set up algolia
import { environment } from "@/lib";
import {
  ALGOLIA_APPLICATION_KEY,
  ALGOLIA_SEARCH_ONLY_KEY,
} from "@/lib/environment";
import algoliasearch from "algoliasearch/lite";
import { Highlight, Hits, InstantSearch, SearchBox } from "react-instantsearch";

const searchClient = algoliasearch(
  ALGOLIA_APPLICATION_KEY,
  ALGOLIA_SEARCH_ONLY_KEY
);

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

function Hit({ hit }: { hit: HitProps }) {
  return (
    <article>
      <img src={hit.image_url} alt={hit.product_name} />
      <p>{hit.category_name}</p>
      <h1>{hit.product_name}</h1>
      <p>{hit.price}</p>
    </article>
  );
}

export default function SearchResults() {
  return (
    <InstantSearch
      indexName={environment.ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
      insights
    >
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}
