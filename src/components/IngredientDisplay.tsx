import { useState } from "react";
import { Ingredient } from "../App";

type IngredientProps = {
  ingredient: Ingredient;
  onRemove: (Ingredient: Ingredient) => void;
};

const IngredientDispay = ({ ingredient, onRemove }: IngredientProps) => {
  const [showMore, setShowMore] = useState(false);
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
        <p className="text-gray-600 text-sm mb-2">
          {ingredient.serving_qty} {ingredient.serving_unit}
        </p>
        <p className="text-gray-600 text-sm">
          <span className="font-bold">Calories:</span> {ingredient.nf_calories}
        </p>
        {showMore && (
          <>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Total fat:</span>{" "}
              {ingredient.nf_total_fat}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Saturated fat:</span>{" "}
              {ingredient.nf_saturated_fat}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Cholesterol:</span>{" "}
              {ingredient.nf_cholesterol}mg
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Sodium:</span> {ingredient.nf_sodium}
              mg
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Total carbohydrate:</span>{" "}
              {ingredient.nf_total_carbohydrate}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Dietary fiber:</span>{" "}
              {ingredient.nf_dietary_fiber}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Sugars:</span> {ingredient.nf_sugars}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Protein:</span>{" "}
              {ingredient.nf_protein}g
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Potassium:</span>{" "}
              {ingredient.nf_potassium}mg
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Phosphorus:</span> {ingredient.nf_p}mg
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
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Alternate Measures:</span>
            </p>
            <ul>
              {ingredient.alt_measures.map((measure) => (
                <li key={`${measure.measure}-${measure.qty}`}>
                  {measure.qty} {measure.measure} ({measure.serving_weight}g)
                </li>
              ))}
            </ul>
          </>
        )}
        <button onClick={() => setShowMore((preVal) => !preVal)}>...</button>
      </div>
      <button
        onClick={() => onRemove(ingredient)}
        className="hover:text-red-500 active:text-red-700"
      >
        <span className="material-symbols-outlined px-6">delete</span>
      </button>
    </li>
  );
};

export default IngredientDispay;
