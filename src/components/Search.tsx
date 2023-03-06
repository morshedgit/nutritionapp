import { useContext } from "react";
import useSearch from "../hooks/useSearch";
import { IngredientSummary } from "../types";
import Icon from "./Icon";
import { IngredientContext } from "./IngredientProvider";
import SearchResult from "./SearchResult";

interface SearchProps {}
/**
 * The `Search` component allows users to search for ingredients or foods, and displays the results as a list of `IngredientSummary` components.
 * Users can add selected ingredients to their list using the `addIngredients` method from the `IngredientContext`.
 * If there is an error with the search, an error message will be displayed.
 *
 * @component
 * @example
 * return (
 *   <Search />
 * )
 */
const Search: React.FC<SearchProps> = (props) => {
  const { addIngredients: addIngredient } = useContext(IngredientContext);

  // Use the `useSearch` hook to handle search queries and results
  const { results, searching, error, query, onQuery, resetSearch } =
    useSearch();

  /**
   * A callback function that adds selected ingredients to the user's list
   *
   * @param {IngredientSummary[]} ingredientSummaries - An array of `IngredientSummary` objects representing the selected ingredients
   */
  const handleAddIngredients = (ingredientSummaries: IngredientSummary[]) => {
    addIngredient(ingredientSummaries);
    resetSearch();
  };

  return (
    <div className="text-black flex flex-col items-center mx-auto [&:focus-within>section]:block w-24 md:min-w-[20rem] [&:focus-within]:w-full md:max-w-md [&:focus-within]:absolute md:[&:focus-within]:relative  md:relative">
      <div className="w-full relative">
        <input
          type="search"
          className="w-full pl-10 pr-4 py-2 rounded-full border border-green-600 focus:border-green-800 bg-green-300 focus:outline-none [&::placeholder]:truncate"
          placeholder="Search For Ingredients, Foods,..."
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
        <span className="absolute left-0 top-0 flex items-center pl-3 h-full">
          {searching ? (
            <Icon title="autorenew" className="animate-spin infinite" />
          ) : (
            <Icon title="search_check" />
          )}
        </span>
      </div>
      {error && (
        <div className="absolute top-12 min-w-sm bg-white shadow-lg rounded-lg flex items-center p-4 gap-4">
          <Icon title="warning" className="text-red-500 text-3xl" />
          <div className="text-sm">
            <h3 className="font-bold">Something went wrong!</h3>
            <p>Please try again...</p>
          </div>
        </div>
      )}
      <SearchResult
        ingredientSummaries={results}
        className="hidden absolute top-12 w-[inherit]"
        onAdd={handleAddIngredients}
      />
    </div>
  );
};

export default Search;
