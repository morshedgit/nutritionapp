import { useContext, useMemo, useState } from "react";
import { numberFormatter } from "../common/util";
import { Ingredient } from "../types";
import { IngredientContext } from "./IngredientProvider";

type IngredientProps = {
  ingredient: Ingredient;
};

const IngredientDispay: React.FC<IngredientProps> = ({ ingredient }) => {
  const { removeIngredient, updateIngredient } = useContext(IngredientContext);
  const [showMore, setShowMore] = useState(false);
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

  const handleUpdateQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateIngredient({
      ...ingredient,
      [e.target.name]: e.target.valueAsNumber,
    });
  };
  const handleUpdateUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateIngredient({
      ...ingredient,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <li className="w-full flex border-b-2  hover:bg-orange-50 active:bg-orange-100 h-fit">
      <img
        className="w-24 h-24 object-cover rounded-lg m-2"
        src={ingredient.photo.thumb}
        alt={`${ingredient.food_name} thumbnail`}
      />
      <div className="flex-grow px-4 py-2 flex flex-col items-start">
        <div>
          <h3 className="text-gray-800 font-bold text-xl mb-2">
            {ingredient.food_name}
          </h3>
        </div>
        <div className="text-gray-600 text-sm mb-2 flex gap-2">
          <input
            name="selectedQty"
            type="number"
            value={ingredient.selectedQty}
            onChange={(e) => handleUpdateQty(e)}
            className="w-12"
          />
          <select
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
        <p className="text-gray-600 text-sm">
          <span className="font-bold">Calories:</span>{" "}
          {numberFormatter.format(ingredient.nf_calories * ratio)}
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
            {/* To display the full nutrients, you can map through the array and display each nutrient */}
            {/* {ingredient.full_nutrients.map((nutrient) => (
              <p className="text-gray-600 text-sm" key={nutrient.attr_id}>
                <span className="font-bold">{nutrient.attr_name}:</span>{" "}
                {nutrient.value} {nutrient.unit}
              </p>
            ))} */}
            {/* To display the tag, you can check if it exists and display*/}
            {ingredient.tags && (
              <p className="text-gray-600 text-sm">
                <span className="font-bold">Tag:</span> {ingredient.tags.item}
              </p>
            )}
            {/* To display the alternative serving measures, you can map through the array and display each measure */}
            {/* <p className="text-gray-600 text-sm">
              <span className="font-bold">Alternate Measures:</span>
            </p>
            <ul>
              {ingredient.alt_measures.map((measure) => (
                <li key={`${measure.measure}-${measure.qty}`}>
                  {measure.qty} {measure.measure} ({measure.serving_weight}g)
                </li>
              ))}
            </ul> */}
          </>
        )}
        <button onClick={() => setShowMore((preVal) => !preVal)}>...</button>
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
