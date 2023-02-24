import { useEffect, useState } from "react";
import { debounce } from "../common/util";
import FoodList from "./FoodList";

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
  onAdd: (item: IngredientSummary) => void;
  //   onRemove: (item: FoodData) => void;
}

const Search: React.FC<SearchProps> = ({ onAdd }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IngredientSummary[]>([]);

  const handleSearch = async () => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`,
        {
          headers: {
            "x-app-id": "9aa2f7ac",
            "x-app-key": "b75ff2973f91f1f6521c6d863bfb8a84",
            "x-remote-user-id": "0",
          },
        }
      );
      const data = await response.json();
      setResults(data.common);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const search = debounce(handleSearch, 1000);
  useEffect(() => {
    search();
  }, [query]);

  return (
    <div className="relative flex flex-col items-center max-w-sm mx-auto [&:focus-within>ul]:block">
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
        foodList={results}
        className="hidden absolute top-12"
        onAdd={onAdd}
      />
    </div>
  );
};

export default Search;
