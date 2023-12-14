import SearchFiltersDropDown from "@/components/search/search-filters-dropdown";
import SearchInput from "@/components/search/search-input";
import SearchResults from "@/components/search/search-results";

export default function Page() {
  return (
    <article role="search">
      <div className="my-2 space-y-2">
        <SearchInput />

        <div className="w-full">
          <SearchFiltersDropDown />
        </div>

        <div className="w-full">
          <SearchResults />
        </div>
      </div>
    </article>
  );
}
