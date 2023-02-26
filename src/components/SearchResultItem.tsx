import { IngredientSummary } from "../types";

type SearchResultItemProps = {
  ingredientSummary: IngredientSummary;
  onAddIngredientSummary: (ingredientSummary: IngredientSummary) => void;
  isSelected: boolean;
};

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  ingredientSummary,
  onAddIngredientSummary,
  isSelected,
}) => {
  const handleSelect = (ingredientSummary: IngredientSummary) => {
    if (isSelected) return;
    onAddIngredientSummary(ingredientSummary);
  };
  return (
    <li
      key={`${ingredientSummary.food_name}${ingredientSummary.tag_id}`}
      className="hover:bg-blue-300 leading-[0] active:bg-blue-400 border-b-2 px-4"
    >
      <button
        onClick={() => handleSelect(ingredientSummary)}
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
            {ingredientSummary.serving_qty} {ingredientSummary.serving_unit}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-bold">Tag:</span> {ingredientSummary.tag_name}
          </p>
        </div>
        {isSelected && (
          <div className="h-full flex flex-col justify-center">
            <span className="material-symbols-outlined w-6 h-6 bg-green-500 text-white rounded-full">
              check
            </span>
          </div>
        )}
      </button>
    </li>
  );
};

export default SearchResultItem;
