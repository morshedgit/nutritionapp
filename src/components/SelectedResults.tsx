import { IngredientSummary } from "../types";
import Icon from "./Icon";

type SelectedResultsProps = {
  selectedIngredientSummaries: IngredientSummary[];
  onRemove: (ingredientSummary: IngredientSummary) => void;
};

/**
 * A component that displays a list of selected ingredient summaries, and allows removing them.
 * @component
 *
 * @param {object} props - The component props.
 * @param {IngredientSummary[]} props.selectedIngredientSummaries - An array of selected ingredient summaries to display.
 * @param {function} props.onRemove - A callback function to remove an ingredient summary from the list.
 *
 * @returns {JSX.Element} The JSX element for the `SelectedResults` component.
 */
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
    <section className="flex flex-col items-stretch bg-green-200" tabIndex={-1}>
      <ul className="w-full p-2 flex flex-wrap gap-2">
        {selectedIngredientSummaries.map((ingredientSummary) => (
          <li key={ingredientSummary.food_name}>
            <button
              type="button"
              className="unset-all relative group"
              onMouseDown={(e) =>
                handleToggleIngredientSummary(e, ingredientSummary)
              }
            >
              <img
                className="w-24 h-24 object-cover rounded-full border group-hover:border-red-500 hover:border-2"
                src={ingredientSummary.photo.thumb}
                alt={`${ingredientSummary.food_name} thumbnail`}
              />
              <div className="absolute w-24 h-24 top-0 left-0 text-5xl rounded-full hidden group-hover:grid group-hover:place-content-center">
                <Icon title="close" className="text-red-500 text-5xl" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SelectedResults;
