import React, { useContext } from "react";
import { IngredientContext } from "./IngredientProvider";
import Ingredients from "./Ingredients";
import NutrientsDisplay from "./Nutrients";
type MealProps = {};

const Meal: React.FC<MealProps> = (props) => {
  const { ingredients, removeIngredient, totalMealNutrientCount } =
    useContext(IngredientContext);

  return (
    <div className="w-full pt-10">
      {/* <Search onAdd={handleAddIngredient} /> */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <NutrientsDisplay
          nutrients={totalMealNutrientCount}
          className="md:col-start-2 min-w-full"
        />
        <Ingredients
          ingredients={ingredients}
          onRemove={removeIngredient}
          className="md:col-start-1 md:row-start-1 min-w-full"
        />
      </section>
    </div>
  );
};

export default Meal;
