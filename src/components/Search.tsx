import { useContext } from "react";
import useSearch from "../hooks/useSearch";
import { IngredientSummary } from "../types";
import { IngredientContext } from "./IngredientProvider";
import FoodList from "./SearchResult";

interface SearchProps {}

const Search: React.FC<SearchProps> = (props) => {
  const { addIngredients: addIngredient } = useContext(IngredientContext);
  const { results, searching, error, query, onQuery, resetSearch } =
    useSearch();

  const handleAddIngredients = (ingredientSummaries: IngredientSummary[]) => {
    addIngredient(ingredientSummaries);
    resetSearch();
  };

  return (
    <div className="text-black relative flex flex-col items-center max-w-sm mx-auto [&:focus-within>section]:block focus-within:w-96">
      <div className="w-full relative">
        <input
          type="search"
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none"
          placeholder="Search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
        <span className="absolute left-0 top-0 flex items-center pl-3 h-full">
          {searching ? (
            <span className="material-symbols-outlined animate-spin infinite">
              autorenew
            </span>
          ) : (
            <span className="material-symbols-outlined">search_check</span>
          )}
        </span>
      </div>
      {error && (
        <div className="absolute top-12 min-w-sm bg-white shadow-lg rounded-lg flex items-center p-4 gap-4">
          <span className="material-symbols-outlined text-red-500 text-3xl">
            warning
          </span>
          <div className="text-sm">
            <h3 className="font-bold">Something went wrong!</h3>
            <p>Please try again...</p>
          </div>
        </div>
      )}
      <FoodList
        ingredientSummaries={results}
        className="hidden absolute top-12 min-w-xs"
        onAdd={handleAddIngredients}
      />
    </div>
  );
};

export default Search;
