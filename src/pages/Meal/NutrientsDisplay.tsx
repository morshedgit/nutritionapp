import React from "react";
import { numberFormatter } from "../../common/util";
import { Nutrients } from "../../types";

type Props = {
  nutrients: Nutrients;
  className?: string;
};
/**
 * Component that displays the nutrition information of a meal.
 * @param {Object} props - The props object that contains the following properties:
 * @param {Object} props.nutrients - An object that contains the nutrition information of a meal.
 * @param {string} [props.className] - An optional CSS class name to apply to the component.
 * @returns {JSX.Element} - A React JSX element that displays the nutrition information of a meal.
 */
const NutrientsDisplay: React.FC<Props> = ({ nutrients, className }) => {
  return (
    <div
      className={`border-8 border-green-800 border-solid p-6 rounded-2xl ${
        className ?? ""
      }`}
    >
      <h2 className="text-3xl font-bold my-4 text-center">
        Your Meal’s Nutrition Facts
      </h2>
      <div className="bg-green-200 h-6 w-2/3 mx-auto mb-4"></div>
      <div className="bg-green-200 h-2 w-2/3 mx-auto"></div>

      <h3 className="w-full text-center flex justify-center gap-2 text-2xl font-bold my-4">
        <span>Calories</span>
        <span>{numberFormatter.format(nutrients.nf_calories)}</span>
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between text-lg font-bold border-t-solid border-t-black border-t-2">
          <p>Total Fat</p>
          <p>{numberFormatter.format(nutrients.nf_total_fat)}g</p>
        </div>
        <div className="flex justify-between text-lg font-bold border-t-solid border-t-black border-t-2">
          <p>Saturated Fat</p>
          <p className="font-bold">
            {numberFormatter.format(nutrients.nf_saturated_fat)}g
          </p>
        </div>
        <div className="flex justify-between text-lg font-bold border-t-solid border-t-black border-t-2">
          <p>Cholesterol</p>
          <p className="font-bold">
            {numberFormatter.format(nutrients.nf_cholesterol)}mg
          </p>
        </div>
        <div className="flex justify-between text-lg font-bold border-t-solid border-t-black border-t-2">
          <p>Sodium</p>
          <p className="font-bold">
            {numberFormatter.format(nutrients.nf_sodium)}mg
          </p>
        </div>
        <div className="flex justify-between text-lg font-bold border-t-solid border-t-black border-t-2">
          <p>Total Carbohydrate</p>
          <p className="font-bold">
            {numberFormatter.format(nutrients.nf_total_carbohydrate)}g
          </p>
        </div>
        <div className="flex justify-between text-lg font-bold border-t-solid border-t-black border-t-2">
          <p>Dietary Fiber</p>
          <p className="font-bold">
            {numberFormatter.format(nutrients.nf_dietary_fiber)}g
          </p>
        </div>
        <div className="flex justify-between text-lg font-bold border-t-solid border-t-black border-t-2">
          <p>Sugars</p>
          <p className="font-bold">
            {numberFormatter.format(nutrients.nf_sugars)}g
          </p>
        </div>
        <div className="flex justify-between text-lg font-bold border-t-solid border-t-black border-t-2">
          <p>Protein</p>
          <p className="font-bold">
            {numberFormatter.format(nutrients.nf_protein)}g
          </p>
        </div>
        <div className="flex justify-between text-lg font-bold border-t-solid border-t-black border-t-2">
          <p>Potassium</p>
          <p className="font-bold">
            {numberFormatter.format(nutrients.nf_potassium)}mg
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutrientsDisplay;
