import React, { useContext } from "react";
import BeginContent from "./BeginContent";
import { IngredientContext } from "./IngredientProvider";
import Ingredients from "./Ingredients";
import NutrientsDisplay from "./NutrientsDisplay";
type MealProps = {};

const Meal: React.FC<MealProps> = (props) => {
  const { totalMealNutrientCount, ingredients } = useContext(IngredientContext);

  return (
    <>
      {ingredients.length === 0 && <BeginContent />}
      {ingredients.length > 0 && (
        <div className="w-full pt-10">
          <section className="grid grid-cols-1 lg:grid-cols-2">
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
