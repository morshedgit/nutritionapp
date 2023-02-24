import React, { useEffect, useState } from "react";
import { Ingredient } from "../App";
import { IngredientSummary } from "./search";

type IngredientsProps = {
  ingredients: Ingredient[];
  onRemove: (item: Ingredient) => void;
  className?: string;
};

const Ingredients: React.FC<IngredientsProps> = ({
  ingredients,
  className,
  onRemove,
}) => {
  return (
    <ul
      tabIndex={-1}
      className={`grid grid-cols-1 gap-2 mx-auto max-w-md shadow-lg rounded-lg ${className}`}
    >
      {ingredients.map((ingredient) => (
        <li
          key={`${ingredient.food_name}`}
          className="w-full flex border-b-2  hover:bg-orange-50 active:bg-orange-100"
        >
          <img
            className="w-24 h-24 object-cover"
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
            {/* <p className="text-gray-600 text-sm">
              <span className="font-bold">Tag:</span> {ingredient.tag_name}
            </p> */}
          </div>
          <button
            onClick={() => onRemove(ingredient)}
            className="hover:text-red-500 active:text-red-700"
          >
            <span className="material-symbols-outlined px-6">delete</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Ingredients;
