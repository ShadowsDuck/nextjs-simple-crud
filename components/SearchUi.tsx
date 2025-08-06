"use client";

import React, { useEffect, useState } from "react";

import { SearchBar } from "@upstash/search-ui";
import "@upstash/search-ui/dist/index.css";

import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Search } from "@upstash/search";

export const SearchClient = new Search({
  url: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL,
  token: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_TOKEN,
});

// 👇 your search index name
const index = SearchClient.index<Props, Metadata>("main");

const SearchUi = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex items-center">
      <div className="w-64">
        <SearchBar.Dialog open={open} onOpenChange={setOpen}>
          <div className="relative w-full">
            <SearchBar.DialogTrigger
              placeholder="Search..."
              className="w-full pr-20"
            />

            <div className="absolute right-3 top-1/4 -translate-y-1/2 flex items-center space-x-1 text-xs text-muted-foreground pointer-events-none">
              <kbd className="bg-muted border rounded px-1.5 py-0.5 text-[10px] font-bold">
                Ctrl
              </kbd>
              <kbd className="bg-muted border rounded px-1.5 py-0.5 text-[10px] font-bold">
                K
              </kbd>
            </div>
          </div>

          <SearchBar.DialogContent className="p-0!">
            <SearchBar.Input
              placeholder="Type to search..."
              className="focus:outline-2 focus:outline-green-500 focus:ring-border"
            />
            <SearchBar.Results
              searchFn={(query) => {
                // 👇 100% type-safe: whatever you return here is
                // automatically typed as `result` below
                return index.search({ query, limit: 10, reranking: true });
              }}
            >
              {(result) => (
                <SearchBar.Result
                  onSelect={() => {
                    router.push(`/user/${result.metadata?.id}`);
                    setOpen(false);
                  }}
                  value={result.id}
                  key={result.id}
                  className="cursor-pointer"
                >
                  <SearchBar.ResultIcon>
                    <FileText className="text-gray-600" />
                  </SearchBar.ResultIcon>

                  <SearchBar.ResultContent>
                    <SearchBar.ResultTitle>
                      {result.content.username}
                    </SearchBar.ResultTitle>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {result.score}
                    </p>
                  </SearchBar.ResultContent>
                </SearchBar.Result>
              )}
            </SearchBar.Results>
          </SearchBar.DialogContent>
        </SearchBar.Dialog>
      </div>
    </div>
  );
};

export default SearchUi;
