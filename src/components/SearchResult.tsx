import React, { useMemo, useRef, useState } from "react";
import { IngredientSummary } from "../types";

type SelectedIngredientSummariesProps = {
  selectedIngredientSummaries: IngredientSummary[];
  onRemove: (ingredientSummary: IngredientSummary) => void;
};

const SelectedIngredientSummaries: React.FC<
  SelectedIngredientSummariesProps
> = ({ selectedIngredientSummaries, onRemove }) => {
  const handleToggleIngredientSummary = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ingredientSummary: IngredientSummary
  ) => {
    e?.preventDefault();
    onRemove(ingredientSummary);
  };
  return (
    <section className="flex flex-col items-stretch" tabIndex={-1}>
      <ul className="w-full overflow-x-auto">
        {selectedIngredientSummaries.map((ingredientSummary) => (
          <li key={ingredientSummary.food_name}>
            <button
              type="button"
              className="unset-all"
              onMouseDown={(e) =>
                handleToggleIngredientSummary(e, ingredientSummary)
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
    </section>
  );
};

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
      className={`shadow-lg rounded-lg bg-white ${className}`}
    >
      <ul className="grid grid-cols-1 gap-2 max-h-96 overflow-y-scroll ">
        {ingredientSummaries.map((ingredientSummary) => (
          <li
            key={`${ingredientSummary.food_name}${ingredientSummary.tag_id}`}
            className="hover:bg-blue-300 leading-[0] active:bg-blue-400 border-b-2 px-4"
          >
            <button
              onClick={() => handleAddIngredientSummary(ingredientSummary)}
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
      <SelectedIngredientSummaries
        selectedIngredientSummaries={selectedIngredientSummaries}
        onRemove={handleRemoveIngredientSummary}
      />

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
