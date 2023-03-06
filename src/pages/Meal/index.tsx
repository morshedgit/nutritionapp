import React, { useContext, useEffect, useState } from "react";
import { IngredientContext } from "../../components/IngredientProvider";
import IntroContent from "./IntroContent";
import Ingredients from "./Ingredients";
import NutrientsDisplay from "./NutrientsDisplay";
import AddMeal from "./AddMeal";
import SaveMeal from "./SaveMeal";
import EditTitle from "./EditTitle";

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
const Meal: React.FC = () => {
  const {
    totalMealNutrientCount,
    ingredients,
    paramsString,
    title,
    updateTitle: onUpdateTitle,
    updateMeal,
  } = useContext(IngredientContext);

  const [shouldSave, setShouldSave] = useState(false);

  const handleSaveMeal = () => {
    if (!title) return;
    updateMeal({ title, path: paramsString });
    setShouldSave(false);
  };

  useEffect(() => {
    setShouldSave(true);
  }, [ingredients]);

  return (
    <>
      {ingredients.length === 0 && <IntroContent />}
      {title && (
        <span className="w-full flex items-center justify-center group">
          <h2 className="text-3xl text-center text-orange-600 inline-block">
            {title}
          </h2>
          <EditTitle
            title={title}
            updateMealTitle={onUpdateTitle}
            className="hidden group-hover:inline-block"
          />
        </span>
      )}
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
      {ingredients.length > 0 && !title && (
        <AddMeal onUpdateTitle={onUpdateTitle} />
      )}
      {ingredients.length > 0 && title && shouldSave && (
        <SaveMeal onUpdateMeal={handleSaveMeal} />
      )}
    </>
  );
};

export default Meal;
