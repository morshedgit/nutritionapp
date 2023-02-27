import React, { useMemo, useState } from "react";
import { IngredientSummary } from "../types";
import SearchResultItem from "./SearchResultItem";
import SelectedResults from "./SelectedResults";

type SearchResultProps = {
  ingredientSummaries: IngredientSummary[];
  onAdd: (item: IngredientSummary[]) => void;
  className?: string;
};

/**
 * Renders a list of search results for ingredients and a section for selected results.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {Array} props.ingredientSummaries - An array of ingredient summary objects to display.
 * @param {Function} props.onAdd - A callback function to execute when the "All Done!!!" button is clicked.
 * @param {string} [props.className] - Additional class names to apply to the component.
 *
 * @returns {JSX.Element} A React JSX element representing the SearchResult component.
 */
const SearchResult: React.FC<SearchResultProps> = ({
  ingredientSummaries,
  className,
  onAdd,
}) => {
  const [selectedIngredientSummaries, setSelectedIngredientSummaries] =
    useState<IngredientSummary[]>([]);

  const handleAddIngredientSummary = (ingredientSummary: IngredientSummary) => {
    setSelectedIngredientSummaries((preSumm) => [
      ...preSumm,
      ingredientSummary,
    ]);
  };
  const handleRemoveIngredientSummary = (
    ingredientSummary: IngredientSummary
  ) => {
    setSelectedIngredientSummaries((preSumm) =>
      preSumm.filter((sum) => sum.food_name !== ingredientSummary.food_name)
    );
  };

  const selectedIngredientNames = useMemo(
    () => selectedIngredientSummaries.map((ing) => ing.food_name),
    [selectedIngredientSummaries]
  );

  const handleAddIngredient = () => {
    onAdd(selectedIngredientSummaries);
    setSelectedIngredientSummaries([]);
  };

  return (
    <section
      tabIndex={-1}
      className={`${
        ingredientSummaries.length > 0 ? "py-4" : ""
      } shadow-lg rounded-3xl ${className} bg-green-100`}
    >
      <ul className="grid grid-cols-1 gap-2 max-h-96 overflow-y-scroll bg-green-100 ">
        {ingredientSummaries.map((ingredientSummary) => (
          <SearchResultItem
            key={ingredientSummary.food_name}
            ingredientSummary={ingredientSummary}
            onAddIngredientSummary={handleAddIngredientSummary}
            isSelected={selectedIngredientNames.includes(
              ingredientSummary.food_name
            )}
          />
        ))}
      </ul>
      {selectedIngredientNames.length > 0 && (
        <SelectedResults
          selectedIngredientSummaries={selectedIngredientSummaries}
          onRemove={handleRemoveIngredientSummary}
        />
      )}

      {selectedIngredientNames.length > 0 && (
        <section className="w-full flex justify-center mt-4 bg-green-100">
          <button
            onClick={() => handleAddIngredient()}
            className="py-2 px-4 rounded-full bg-orange-400 hover:bg-orange-500 active:bg-orange-600"
          >
            All Done!!!
          </button>
        </section>
      )}
    </section>
  );
};

export default SearchResult;
