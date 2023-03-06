import { IngredientSummary } from "../types";
import Icon from "./Icon";

type SearchResultItemProps = {
  ingredientSummary: IngredientSummary;
  onAddIngredientSummary: (ingredientSummary: IngredientSummary) => void;
  isSelected: boolean;
};

/**
 * Renders an item in the search result list.
 * @param {Object} props - The component props.
 * @param {IngredientSummary} props.ingredientSummary - The summary of the ingredient to display.
 * @param {(ingredientSummary: IngredientSummary) => void} props.onAddIngredientSummary - The callback function to add the ingredient to the selected list.
 * @param {boolean} props.isSelected - Indicates if the ingredient is already selected.
 * @returns {JSX.Element} - The rendered component.
 */
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
      className="bg-green-100 hover:bg-orange-100 leading-[0] active:bg-orange-200 border-b-2 px-4"
    >
      <button
        onClick={() => handleSelect(ingredientSummary)}
        className="h-28 w-full unset-all flex items-center"
      >
        <img
          className="w-24 h-24 object-cover rounded-full"
          src={ingredientSummary.photo.thumb}
          alt={`${ingredientSummary.food_name} thumbnail`}
        />
        <div className="flex-grow px-4 py-2 flex flex-col items-start">
          <div>
            <h3 className="text-gray-800 font-bold text-xl mb-2 capitalize">
              {ingredientSummary.food_name}
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            {ingredientSummary.serving_qty} {ingredientSummary.serving_unit}
          </p>
          <p className="text-gray-600 text-sm">{ingredientSummary.tag_name}</p>
        </div>
        {isSelected && (
          <div className="h-full flex flex-col justify-center">
            <Icon
              title="check"
              className="bg-green-500 text-white rounded-full aspect-square"
            />
          </div>
        )}
      </button>
    </li>
  );
};

export default SearchResultItem;
