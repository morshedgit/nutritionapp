import { useContext, useMemo, useState } from "react";
import { numberFormatter } from "../common/util";
import { Ingredient } from "../types";
import { IngredientContext } from "./IngredientProvider";

/**
 * IngredientProps is an interface for the props passed to the IngredientDisplay component
 * @interface
 */
type IngredientProps = {
  ingredient: Ingredient;
};

/**
 * IngredientDisplay component displays an ingredient and its properties
 * @function
 * @param {IngredientProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const IngredientDispay: React.FC<IngredientProps> = ({ ingredient }) => {
  const { removeIngredient, updateIngredient } = useContext(IngredientContext);
  const [showMore, setShowMore] = useState(false);

  /**
   * Ratio is the proportion of the serving size compared to the selected amount and unit of the ingredient
   * @type {number}
   */
  const ratio = useMemo(() => {
    const measure = ingredient.alt_measures.find(
      (measure) => measure.measure === ingredient.selectedUnit
    );
    if (!measure) return 1;

    const servingPerQty = measure.serving_weight / measure.qty;
    return (
      (ingredient.selectedQty * servingPerQty) / ingredient.serving_weight_grams
    );
  }, [ingredient]);

  /**
   * handleUpdateQty updates the selected quantity of the ingredient
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event object
   * @returns {void}
   */
  const handleUpdateQty = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateIngredient({
      ...ingredient,
      [e.target.name]: e.target.valueAsNumber,
    });
  };

  /**
   * handleUpdateUnit updates the selected unit of the ingredient
   * @function
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Event object
   * @returns {void}
   */
  const handleUpdateUnit = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    updateIngredient({
      ...ingredient,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <li className="w-full flex border-b-2 bg-green-100 hover:bg-orange-100 leading-[0] active:bg-orange-200 h-fit pb-2">
      <img
        className="w-24 h-24 object-cover rounded-full m-2"
        src={ingredient.photo.thumb}
        alt={`${ingredient.food_name} thumbnail`}
      />
      <div className="flex-grow px-4 py-2 flex flex-col items-start">
        <div>
          <h3 className="text-gray-800 font-bold text-xl mb-2">
            {ingredient.food_name}
          </h3>
        </div>
        <div className="text-gray-600 text-sm mb-2 w-[inherit] flex gap-2">
          <input
            name="selectedQty"
            min={0}
            type="number"
            value={ingredient.selectedQty}
            onChange={(e) => handleUpdateQty(e)}
            className="w-12 rounded-full"
          />
          <select
            className="rounded-full"
            name="selectedUnit"
            value={ingredient.selectedUnit}
            onChange={(e) => handleUpdateUnit(e)}
          >
            {ingredient.alt_measures.map((measure) => (
              <option key={measure.measure} value={measure.measure}>
                {measure.measure}
              </option>
            ))}
          </select>
        </div>
        <p className="text-gray-600 text-sm flex items-center gap-2 mb-4">
          {numberFormatter.format(ingredient.nf_calories * ratio)}
          <span className="font-bold">Cal</span>
        </p>
        {showMore && (
          <>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Total fat:</span>{" "}
              {numberFormatter.format(ingredient.nf_total_fat * ratio)}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Saturated fat:</span>{" "}
              {numberFormatter.format(ingredient.nf_saturated_fat * ratio)}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Cholesterol:</span>{" "}
              {numberFormatter.format(ingredient.nf_cholesterol * ratio)}mg
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Sodium:</span>{" "}
              {numberFormatter.format(ingredient.nf_sodium * ratio)}
              mg
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Total carbohydrate:</span>{" "}
              {numberFormatter.format(ingredient.nf_total_carbohydrate * ratio)}
              g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Dietary fiber:</span>{" "}
              {numberFormatter.format(ingredient.nf_dietary_fiber * ratio)}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Sugars:</span>{" "}
              {numberFormatter.format(ingredient.nf_sugars * ratio)}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Protein:</span>{" "}
              {numberFormatter.format(ingredient.nf_protein * ratio)}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Potassium:</span>{" "}
              {numberFormatter.format(ingredient.nf_potassium * ratio)}mg
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Phosphorus:</span>{" "}
              {numberFormatter.format(ingredient.nf_p * ratio)}mg
            </p>
            {ingredient.tags && (
              <p className="text-gray-600 text-sm">
                <span className="font-bold">Tag:</span> {ingredient.tags.item}
              </p>
            )}
          </>
        )}
        <button onClick={() => setShowMore((preVal) => !preVal)}>
          {showMore ? (
            <span className="material-symbols-outlined">expand_less</span>
          ) : (
            <span> Learn More</span>
          )}
        </button>
      </div>
      <button
        onClick={() => removeIngredient(ingredient)}
        className="hover:text-red-500 active:text-red-700"
      >
        <span className="material-symbols-outlined px-6">delete</span>
      </button>
    </li>
  );
};

export default IngredientDispay;
