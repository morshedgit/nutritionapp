import React, { useContext } from "react";
import IngredientDispay from "./IngredientDisplay";
import { IngredientContext } from "./IngredientProvider";

type IngredientsProps = {
  className?: string;
};

const Ingredients: React.FC<IngredientsProps> = ({ className }) => {
  const { ingredients } = useContext(IngredientContext);
  return (
    <ul
      tabIndex={-1}
      className={`bg-green-100 flex flex-col gap-2 max-w-md shadow-lg rounded-3xl py-4 ${className}`}
    >
      {ingredients.map((ingredient) => (
        <IngredientDispay
          ingredient={ingredient}
          key={`${ingredient.food_name}`}
        />
      ))}
    </ul>
  );
};

export default Ingredients;
