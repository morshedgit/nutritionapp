import React, { useMemo, useState } from "react";
import { IngredientSummary } from "./Search";

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

  const handleToggleIngredientSummary = (
    ingredientSummary: IngredientSummary
  ) => {
    if (selectedIngredientNames.includes(ingredientSummary.food_name)) {
      setSelectedIngredientSummaries((preSumm) =>
        preSumm.filter((sum) => sum.food_name !== ingredientSummary.food_name)
      );
      return;
    }
    setSelectedIngredientSummaries((preSumm) => [
      ...preSumm,
      ingredientSummary,
    ]);
  };

  const selectedIngredientNames = useMemo(
    () => selectedIngredientSummaries.map((ing) => ing.food_name),
    [selectedIngredientSummaries]
  );

  return (
    <section
      tabIndex={-1}
      className={`shadow-lg rounded-lg bg-white ${className}`}
    >
      <ul className="grid grid-cols-1 gap-2 max-h-96 overflow-y-scroll ">
        {ingredientSummaries.map((ingredientSummary) => (
          <li
            key={`${ingredientSummary.food_name}${ingredientSummary.tag_id}`}
            className="hover:bg-blue-300 leading-[0] active:bg-blue-400 border-b-2 px-4"
          >
            <button
              onClick={() => handleToggleIngredientSummary(ingredientSummary)}
              className="h-28 w-full unset-all flex items-center"
            >
              <img
                className="w-24 h-24 object-cover rounded-lg"
                src={ingredientSummary.photo.thumb}
                alt={`${ingredientSummary.food_name} thumbnail`}
              />
              <div className="flex-grow px-4 py-2 flex flex-col items-start">
                <div>
                  <h3 className="text-gray-800 font-bold text-xl mb-2">
                    {ingredientSummary.food_name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {ingredientSummary.serving_qty}{" "}
                  {ingredientSummary.serving_unit}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Tag:</span>{" "}
                  {ingredientSummary.tag_name}
                </p>
              </div>
              {selectedIngredientNames.includes(
                ingredientSummary.food_name
              ) && (
                <div className="h-full flex flex-col justify-center">
                  <span className="material-symbols-outlined w-6 h-6 bg-green-500 text-white rounded-full">
                    check
                  </span>
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
      {selectedIngredientNames.length > 0 && (
        <section className="flex flex-col items-stretch">
          <ul className="w-full overflow-x-auto">
            {selectedIngredientSummaries.map((ingredientSummary, index) => (
              <li
                key={ingredientSummary.food_name}
                className={`inline-block relative ${
                  index > 0 ? `-left-[${24 * index}px]` : ""
                }`}
              >
                <button
                  className="unset-all"
                  onClick={() =>
                    handleToggleIngredientSummary(ingredientSummary)
                  }
                >
                  <img
                    className="w-24 h-24 object-cover rounded-full border"
                    src={ingredientSummary.photo.thumb}
                    alt={`${ingredientSummary.food_name} thumbnail`}
                  />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onAdd(selectedIngredientSummaries)}
            className="p-4 rounded-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white"
          >
            Add Ingredients
          </button>
        </section>
      )}
    </section>
  );
};

export default SearchResult;
