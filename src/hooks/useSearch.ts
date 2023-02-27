import { useEffect, useRef, useState } from "react";
import { getSearchResults } from "../services/ingredient";
import { IngredientSummary } from "../types";
import useDebounce from "./useDebounce";

/**
 * A custom hook to handle search functionality for ingredients.
 *
 * @returns {{
 *    results: Array<IngredientSummary>,
 *    searching: boolean,
 *    error: string,
 *    query: string,
 *    onQuery: (q: string) => void,
 *    resetSearch: () => void,
 * }}
 */
const useSearch = () => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<IngredientSummary[]>([]);
  const controllerRef = useRef<AbortController | undefined>();

  /**
   * Handles the search functionality by debouncing the query and fetching the search results.
   */
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
      const data = await getSearchResults({ query: debouncedQuery, signal });
      setResults(data.common);
    } catch (error: any) {
      console.error("Error fetching search results:", error);
      setError(error.message);
    } finally {
      setSearching(false);
    }
  };

  /**
   * Debounces the search query to reduce the number of API requests made.
   */
  const debouncedQuery = useDebounce(query, 300);

  /**
   * Fetches the search results when the debounced query changes.
   * Also, aborts any previous search request before sending a new one.
   */
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
