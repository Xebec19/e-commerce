import { History, X } from "lucide-react";

export default function RecentSearches({
  searches,
  handleSelect,
  handleRemove,
}: {
  searches: string[];
  handleSelect: (qry: string) => void;
  handleRemove: (idx: number) => void;
}) {
  if (!searches.length) {
    return <></>;
  }

  return (
    <div>
      <div className="w-full my-2">
        <h1 className="text-sm text-foreground">Recent Searches</h1>
      </div>

      <div className="flex flex-col">
        {searches.slice(0, 5).map((query, index) => (
          <div key={query + index} className="flex items-center py-2">
            <History className="w-4 h-4 mr-2" />
            <span className="flex-1" onClick={() => handleSelect(query)}>
              {query}
            </span>
            <X className="w-4 h-4" onClick={() => handleRemove(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}
