import { IngredientSummary } from "../types";

type SelectedResultsProps = {
  selectedIngredientSummaries: IngredientSummary[];
  onRemove: (ingredientSummary: IngredientSummary) => void;
};

const SelectedResults: React.FC<SelectedResultsProps> = ({
  selectedIngredientSummaries,
  onRemove,
}) => {
  const handleToggleIngredientSummary = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ingredientSummary: IngredientSummary
  ) => {
    e?.preventDefault();
    onRemove(ingredientSummary);
  };
  return (
    <section className="flex flex-col items-stretch" tabIndex={-1}>
      <ul className="w-full flex overflow-x-auto">
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

export default SelectedResults;
