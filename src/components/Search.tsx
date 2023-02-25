import { useContext, useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { IngredientContext } from "./IngredientProvider";
import FoodList from "./SearchResult";

export interface IngredientSummary {
  food_name: string;
  serving_unit: string;
  tag_name: string;
  serving_qty: number;
  common_type: null;
  tag_id: string;
  photo: {
    thumb: string;
  };
  locale: string;
}

interface SearchProps {
  //   onAdd: (item: IngredientSummary[]) => void;
}

const Search: React.FC<SearchProps> = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IngredientSummary[]>([]);
  const controllerRef = useRef<AbortController | undefined>();
  const { addIngredient } = useContext(IngredientContext);

  const handleSearch = async () => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

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
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const debouncedQuery = useDebounce(query, 0);
  useEffect(() => {
    handleSearch();
    return () => controllerRef.current?.abort();
  }, [debouncedQuery]);

  const handleAddIngredient = (ingredientSummaries: IngredientSummary[]) => {
    addIngredient(ingredientSummaries);
    setResults([]);
  };

  return (
    // <Search onAdd={handleAddIngredient} />
    <div className="text-black relative flex flex-col items-center max-w-sm mx-auto [&:focus-within>section]:block">
      <div className="relative">
        <input
          type="text"
          className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="absolute left-0 top-0 flex items-center pl-3 h-full">
          <span className="material-symbols-outlined">search_check</span>
        </span>
      </div>
      <FoodList
        ingredientSummaries={results}
        className="hidden absolute top-12 min-w-xs"
        onAdd={addIngredient}
      />
    </div>
  );
};

export default Search;
