import React, { useMemo, useRef, useState } from "react";
import { IngredientSummary } from "../types";
import SearchResultItem from "./SearchResultItem";
import SelectedResults from "./SelectedResults";

type SearchResultProps = {
  ingredientSummaries: IngredientSummary[];
  onAdd: (item: IngredientSummary[]) => void;
  className?: string;
};

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
      } shadow-lg rounded-lg bg-white ${className}`}
    >
      <ul className="grid grid-cols-1 gap-2 max-h-96 overflow-y-scroll">
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
        <button
          onClick={() => handleAddIngredient()}
          className="p-4 rounded-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white"
        >
          Add Ingredients
        </button>
      )}
    </section>
  );
};

export default SearchResult;
