import React, { useContext } from "react";
import IntroContent from "./IntroContent";
import { IngredientContext } from "./IngredientProvider";
import Ingredients from "./Ingredients";
import NutrientsDisplay from "./NutrientsDisplay";
import useSearchModifiers from "../hooks/useSearchModifiers";

/**
 * A functional React component that displays a meal's nutrients and ingredients using the NutrientsDisplay and Ingredients components, respectively.
 *
 * @function
 * @name Meal
 *
 * @returns {JSX.Element} The Meal component.
 *
 * @example
 * // Example usage:
 * <Meal />
 *
 */
type MealProps = {};

const Meal: React.FC<MealProps> = (props) => {
  const { totalMealNutrientCount, ingredients } = useContext(IngredientContext);

  const { title, addTitle, removeTitle } = useSearchModifiers();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const { title } = Object.fromEntries(formData.entries());

          if (!title) return;
          addTitle?.(title as string);
        }}
      >
        <input name="title" placeholder="title" defaultValue={title} />
      </form>
      {ingredients.length === 0 && <IntroContent />}
      {ingredients.length > 0 && (
        <div className="w-full pt-10">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <NutrientsDisplay
              nutrients={totalMealNutrientCount}
              className="lg:col-start-2 min-w-full h-fit"
            />
            <Ingredients className="lg:col-start-1 lg:row-start-1 min-w-full" />
          </section>
        </div>
      )}
    </>
  );
};

export default Meal;
