import React from "react";

export type Nutrients = {
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium: number;
};

type Props = {
  nutrients: Nutrients;
  className?: string;
};

const NutrientsDisplay: React.FC<Props> = ({ nutrients, className }) => {
  return (
    <div className={`p-4 bg-gray-100 rounded-lg ${className ?? ""}`}>
      <h2 className="text-lg font-bold mb-4">Nutrition Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Calories:</p>
          <p className="font-bold">{nutrients.nf_calories}</p>
        </div>
        <div>
          <p className="text-gray-600">Total Fat:</p>
          <p className="font-bold">{nutrients.nf_total_fat}g</p>
        </div>
        <div>
          <p className="text-gray-600">Saturated Fat:</p>
          <p className="font-bold">{nutrients.nf_saturated_fat}g</p>
        </div>
        <div>
          <p className="text-gray-600">Cholesterol:</p>
          <p className="font-bold">{nutrients.nf_cholesterol}mg</p>
        </div>
        <div>
          <p className="text-gray-600">Sodium:</p>
          <p className="font-bold">{nutrients.nf_sodium}mg</p>
        </div>
        <div>
          <p className="text-gray-600">Total Carbohydrate:</p>
          <p className="font-bold">{nutrients.nf_total_carbohydrate}g</p>
        </div>
        <div>
          <p className="text-gray-600">Dietary Fiber:</p>
          <p className="font-bold">{nutrients.nf_dietary_fiber}g</p>
        </div>
        <div>
          <p className="text-gray-600">Sugars:</p>
          <p className="font-bold">{nutrients.nf_sugars}g</p>
        </div>
        <div>
          <p className="text-gray-600">Protein:</p>
          <p className="font-bold">{nutrients.nf_protein}g</p>
        </div>
        <div>
          <p className="text-gray-600">Potassium:</p>
          <p className="font-bold">{nutrients.nf_potassium}mg</p>
        </div>
      </div>
    </div>
  );
};

export default NutrientsDisplay;
