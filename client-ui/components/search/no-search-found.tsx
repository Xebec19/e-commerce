import { Search } from "lucide-react";

export default function NoSearchFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6">
        <Search className="h-12 w-12 text-gray-400" />
        <h2 className="text-gray-600 text-2xl">No search results found</h2>
        <p className="text-gray-500 text-lg text-center">
          We couldn&apos;t find any results for your search. Try a different
          search term or browse other categories.
        </p>
      </div>
    </>
  );
}
