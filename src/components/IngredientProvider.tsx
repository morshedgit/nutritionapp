import React, { createContext, ReactNode, useEffect, useRef } from "react";
import { Ingredient, IngredientSummary, Meal, Nutrients } from "../types";
import useIngredients from "../hooks/useIngredients";
import useSearchParams from "../hooks/useSearchParams";
import { useMealStore } from "../hooks/useMealStore";

type IngredientContextProps = {
  paramsString: string;
  title?: string;
  updateTitle: (title: string) => void;
  ingredients: Ingredient[];
  removeIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (ingredient: Ingredient) => void;
  addIngredients: (ingredientSummaries: IngredientSummary[]) => void;
  onResetMeal: () => void;
  totalMealNutrientCount: Nutrients;
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (title: string) => void;
  updateMeal: (meal: Meal) => void;
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
  paramsString: "",
  title: "",
  updateTitle: () => {},
  ingredients: [],
  removeIngredient: () => {},
  updateIngredient: () => {},
  addIngredients: () => {},
  onResetMeal: () => {},
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
  meals: [],
  addMeal: () => {},
  removeMeal: () => {},
  updateMeal: () => {},
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
    paramsString,
    ingredients: initialIngredients,
    onUpdateIngredients,
    title,
    onUpdateTitle,
  } = useSearchParams();

  const {
    initializing,
    ingredients,
    removeIngredient,
    updateIngredient,
    addIngredients,
    resetIngredients,
    totalMealNutrientCount,
  } = useIngredients(initialIngredients);

  const { meals, addMeal, removeMeal, updateMeal } = useMealStore();
  /**
   * Function to handle resetting the current meal by resetting the ingredients array and updating the title.
   */
  const handleResetMeal = () => {
    onUpdateTitle("");
    resetIngredients();
  };
  /**
   * A ref object to keep track of the old title when it changes.
   * @type {React.MutableRefObject<string>}
   */
  const oldTitleRef = useRef(title);
  /**
   * Effect hook to update the meals array when the title changes.
   */
  useEffect(() => {
    if (oldTitleRef.current) {
      removeMeal(oldTitleRef.current);
    }
    addMeal({ title, path: paramsString });
    oldTitleRef.current = title;
  }, [title]);

  /**
   * Effect hook to update the url search params when they change.
   */
  useEffect(() => {
    if (initializing) return;
    onUpdateIngredients(ingredients);
  }, [ingredients]);

  return (
    <IngredientContext.Provider
      value={{
        paramsString,
        title,
        updateTitle: onUpdateTitle,
        ingredients,
        removeIngredient,
        updateIngredient,
        addIngredients,
        onResetMeal: handleResetMeal,
        totalMealNutrientCount,
        meals,
        addMeal,
        removeMeal,
        updateMeal,
      }}
    >
      {props.children}
    </IngredientContext.Provider>
  );
};

export default IngredientProvider;
