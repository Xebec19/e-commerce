import algoliasearch from "algoliasearch";
import { environment } from ".";

const algoliaClient = algoliasearch(
  environment.ALGOLIA_APPLICATION_KEY,
  environment.ALGOLIA_SEARCH_ONLY_KEY
);
const algoliaIndex = algoliaClient.initIndex(
  environment.ALGOLIA_INDEX_NAME + ""
);

export default algoliaIndex;
