import algoliasearch from "algoliasearch";
import { environment } from ".";
import { IProductPayload } from "@/interfaces/product.interface";

const algoliaClient = algoliasearch(
  environment.ALGOLIA_APPLICATION_KEY,
  environment.ALGOLIA_SEARCH_ONLY_KEY
);
const algoliaIndex = algoliaClient.initIndex(
  environment.ALGOLIA_INDEX_NAME + ""
);

export async function querySearch(query: string): Promise<IProductPayload[]> {
  const { hits } = await algoliaIndex.search(query);
  const result = hits.map((hit: any) => ({
    product_id: hit.product_id,
    product_name: hit.product_name,
    product_desc: { String: hit.product_desc, Valid: true },
    price: { Int32: hit.price, Valid: true },
    delivery_price: { Int32: hit.delivery_price, Valid: true },
    image_url: hit.image_url,
    quantity: { Int32: hit.quantity, Valid: true },
    category_name: hit.category_name,
  }));

  return result;
}

export async function querySearchWithFilters({
  query,
  categories,
}: {
  query: string;
  categories: string[];
}): Promise<IProductPayload[]> {
  const { hits } = await algoliaIndex.search(query, {
    filters: categories.length
      ? `category_name:'${categories.join("' OR category_name:'") + "'"}`
      : undefined,
    attributesToRetrieve: [
      "product_id",
      "product_name",
      "product_desc",
      "price",
      "delivery_price",
      "image_url",
      "quantity",
      "category_name",
    ],
    attributesToHighlight: ["product_name"],
    attributesToSnippet: ["product_desc:10"],
    hitsPerPage: 10,
    page: 0,
  });

  const result = hits.map((hit: any) => ({
    product_id: hit.product_id,
    product_name: hit.product_name,
    product_desc: { String: hit.product_desc, Valid: true },
    price: { Int32: hit.price, Valid: true },
    delivery_price: { Int32: hit.delivery_price, Valid: true },
    image_url: hit.image_url,
    quantity: { Int32: hit.quantity, Valid: true },
    category_name: hit.category_name,
  }));

  return result;
}

export default algoliaIndex;
