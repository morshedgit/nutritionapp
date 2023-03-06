import React, { useContext } from "react";
import IngredientDispay from "./IngredientDisplay";
import { IngredientContext } from "../../components/IngredientProvider";

type IngredientsProps = {
  className?: string;
};
/**
 * A functional React component that renders a list of ingredients provided by the IngredientContext using the IngredientDisplay component.
 *
 * @function
 * @name Ingredients
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - The CSS class name to be applied to the component.
 *
 * @returns {JSX.Element} The Ingredients component.
 *
 * @example
 * // Example usage:
 * <Ingredients className="my-class" />
 *
 */
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
