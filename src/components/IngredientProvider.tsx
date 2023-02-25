import React, { createContext, ReactNode, useMemo, useState } from "react";
import Ingredients from "./Ingredients";
import NutrientsDisplay, { Nutrients } from "./Nutrients";
import Search, { IngredientSummary } from "./Search";
type Serving = {
  serving_weight: number;
  measure: string;
  seq: number;
  qty: number;
};
type Tag = {
  item: string;
  measure: null;
  quantity: string;
  food_group: number;
  tag_id: number;
};

type Attribute = {
  attr_id: number;
  value: number;
};
type Photo = {
  thumb: string;
  highres: string;
  is_user_uploaded: boolean;
};

export type Ingredient = {
  food_name: string;
  brand_name: string | null;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium: number;
  nf_p: number;
  full_nutrients: Attribute[];
  tags: Tag;
  alt_measures: Serving[];
  photo: Photo;
};

export const IngredientContext = createContext<{
  ingredients: Ingredient[];
  removeIngredient: (ingredient: Ingredient) => void;
  addIngredient: (ingredientSummaries: IngredientSummary[]) => void;
  totalMealNutrientCount: Nutrients;
}>({
  ingredients: [],
  removeIngredient: () => {},
  addIngredient: () => {},
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

const ingredientCache = new Map<string, Ingredient>();

type IngredientProviderProps = {
  children: ReactNode;
};

const IngredientProvider: React.FC<IngredientProviderProps> = (props) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    setIngredients((preIng) =>
      preIng.filter((ing) => ing.food_name !== ingredient.food_name)
    );
  };

  const handleAddIngredient = (ingredientSummaries: IngredientSummary[]) => {
    ingredientSummaries.forEach((ingredientSummary) =>
      addIngredients(ingredientSummary)
    );
  };

  const addIngredients = async (ingredientSummary: IngredientSummary) => {
    const ingredient = ingredientCache.get(ingredientSummary.food_name);
    if (ingredient) {
      setIngredients((preIngredients) => [
        ...new Set([...preIngredients, ingredient]),
      ]);
      return;
    }

    try {
      const body = JSON.stringify({
        query: ingredientSummary.food_name,
        locale: "en_US",
      });
      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "9aa2f7ac",
            "x-app-key": "b75ff2973f91f1f6521c6d863bfb8a84",
            "x-remote-user-id": "0",
          },
          body,
        }
      );
      const data = await response.json();
      const ingredient = data.foods.find(
        (food: Ingredient) => food.food_name === ingredientSummary.food_name
      ) as Ingredient;
      if (!ingredient) return;
      ingredientCache.set(ingredient.food_name, ingredient);
      setIngredients((preIngredients) => [...preIngredients, ingredient]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const totalMealNutrientCount = useMemo(() => {
    const totalNutrients = ingredients.reduce<Nutrients>(
      (total, cur) => {
        const keys = Object.keys(total) as Array<keyof Nutrients>;
        keys.forEach((nutrient) => (total[nutrient] += cur[nutrient]));
        return total;
      },
      {
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
      } as Nutrients
    );
    return totalNutrients;
  }, [ingredients]);

  const value = {
    ingredients,
    removeIngredient: handleRemoveIngredient,
    addIngredient: handleAddIngredient,
    totalMealNutrientCount,
  };

  return (
    <IngredientContext.Provider value={value}>
      {props.children}
    </IngredientContext.Provider>
  );
};

export default IngredientProvider;
