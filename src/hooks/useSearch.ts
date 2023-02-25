import { useEffect, useRef, useState } from "react";
import { IngredientSummary } from "../types";
import useDebounce from "./useDebounce";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<IngredientSummary[]>([]);
  const controllerRef = useRef<AbortController | undefined>();

  const handleSearch = async () => {
    if (!debouncedQuery) {
      setResults([]);
      setSearching(false);
      setError("");
      return;
    }

    setSearching(true);
    setError("");
    const controller = new AbortController();
    const signal = controller.signal;
    controllerRef.current = controller;

    try {
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${debouncedQuery}`,
        {
          headers: {
            "x-app-id": "9aa2f7ac",
            "x-app-key": "b75ff2973f91f1f6521c6d863bfb8a84",
            "x-remote-user-id": "0",
          },
          signal,
        }
      );
      const data = await response.json();
      setResults(data.common);
    } catch (error: any) {
      console.error("Error fetching search results:", error);
      setError(error.message);
    } finally {
      setSearching(false);
    }
  };
  const debouncedQuery = useDebounce(query, 300);
  useEffect(() => {
    handleSearch();
    return () => controllerRef.current?.abort();
  }, [debouncedQuery]);

  return {
    results,
    searching,
    error,
    query,
    onQuery: (q: string) => setQuery(q),
    resetSearch: () => {
      setQuery("");
      setResults([]);
    },
  };
};

export default useSearch;
