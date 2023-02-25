import React, { useEffect, useState } from "react";
import IngredientDispay from "./IngredientDisplay";
import { Ingredient } from "./IngredientProvider";

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
      className={`flex flex-col gap-2 max-w-md shadow-lg rounded-lg ${className}`}
    >
      {ingredients.map((ingredient) => (
        <IngredientDispay
          ingredient={ingredient}
          onRemove={onRemove}
          key={`${ingredient.food_name}`}
        />
      ))}
    </ul>
  );
};

export default Ingredients;
