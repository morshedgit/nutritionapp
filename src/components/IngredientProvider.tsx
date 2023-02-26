import React, { createContext, ReactNode } from "react";
import { Ingredient, IngredientSummary, Nutrients } from "../types";
import useIngredients from "../hooks/useIngredients";

export const IngredientContext = createContext<{
  ingredients: Ingredient[];
  removeIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (ingredient: Ingredient) => void;
  addIngredients: (ingredientSummaries: IngredientSummary[]) => void;
  totalMealNutrientCount: Nutrients;
}>({
  ingredients: [],
  removeIngredient: () => {},
  updateIngredient: () => {},
  addIngredients: () => {},
  totalMealNutrientCount: {
    nf_calories: 0,
    nf_total_fat: 0,
    nf_saturated_fat: 0,
    nf_cholesterol: 0,
    nf_sodium: 0,
    nf_total_carbohydrate: 0,
    nf_dietary_fiber: 0,
    nf_sugars: 0,
    nf_protein: 0,
    nf_potassium: 0,
  },
});

type IngredientProviderProps = {
  children: ReactNode;
};

const IngredientProvider: React.FC<IngredientProviderProps> = (props) => {
  const {
    ingredients,
    removeIngredient,
    updateIngredient,
    addIngredients,
    totalMealNutrientCount,
  } = useIngredients();

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        removeIngredient,
        updateIngredient,
        addIngredients,
        totalMealNutrientCount,
      }}
    >
      {props.children}
    </IngredientContext.Provider>
  );
};

export default IngredientProvider;
