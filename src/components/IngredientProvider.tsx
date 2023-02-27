import React, { createContext, ReactNode } from "react";
import { Ingredient, IngredientSummary, Nutrients } from "../types";
import useIngredients from "../hooks/useIngredients";

type IngredientContextProps = {
  ingredients: Ingredient[];
  removeIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (ingredient: Ingredient) => void;
  addIngredients: (ingredientSummaries: IngredientSummary[]) => void;
  totalMealNutrientCount: Nutrients;
};
/**
 * Context object for managing ingredients and their nutrient data
 * @typedef {Object} IngredientContext
 * @property {Array<Ingredient>} ingredients - Array of ingredients in the current meal
 * @property {function(ingredient: Ingredient): void} removeIngredient - Function to remove an ingredient from the meal
 * @property {function(ingredient: Ingredient): void} updateIngredient - Function to update an ingredient in the meal
 * @property {function(ingredientSummaries: Array<IngredientSummary>): void} addIngredients - Function to add new ingredients to the meal
 * @property {Nutrients} totalMealNutrientCount - Object representing total nutrient count for the entire meal
 */

export const IngredientContext = createContext<IngredientContextProps>({
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

/**
 * Props for IngredientProvider component
 * @typedef {Object} IngredientProviderProps
 * @property {ReactNode} children - Child components to be wrapped by IngredientProvider
 */

type IngredientProviderProps = {
  children: ReactNode;
};

/**
 * Higher-order component that provides IngredientContext to its children
 * @param {IngredientProviderProps} props - Component props
 * @returns {JSX.Element} - JSX element representing wrapped child components with IngredientContext
 */

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
