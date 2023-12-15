"use client";

// todo set up algolia
import { environment } from "@/lib";
import {
  ALGOLIA_APPLICATION_KEY,
  ALGOLIA_SEARCH_ONLY_KEY,
} from "@/lib/environment";
import algoliasearch from "algoliasearch/lite";
import { Highlight, Hits, InstantSearch, SearchBox } from "react-instantsearch";
import ProductCard from "../product/product-card";
import { IProductPayload } from "@/interfaces/product.interface";

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
  let payload: IProductPayload = {
    product_id: hit.product_id,
    product_name: hit.product_name,
    product_desc: { String: hit.product_desc, Valid: true },
    price: { Int32: hit.price, Valid: true },
    delivery_price: { Int32: hit.delivery_price, Valid: true },
    image_url: hit.image_url,
    quantity: { Int32: hit.quantity, Valid: true },
  };
  return (
    <div
      key={payload.product_id}
      className="aspect-square w-full md:w-[32vw] h-[350px] my-2"
    >
      <ProductCard payload={payload} sizes="(min-width: 768px) 32vw, 80vw" />
    </div>
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
      <section
        role="search results"
        className="flex w-full justify-center md:justify-start"
      >
        <Hits hitComponent={Hit} />
      </section>
    </InstantSearch>
  );
}
