import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import useSearchParams from "./useSearchParams";
import { getIngredient } from "../services/ingredient";
import { Ingredient, IngredientShort, Nutrients } from "../types";

const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const isInitialMount = useRef(true);

  const {
    searchParams: foodItems,
    addOrUpdateParam: addFoodItem,
    removeParam: removeFoodItem,
    addOrUpdateParam: updateFoodItem,
  } = useSearchParams();

  useEffect(() => {
    if (!isInitialMount.current) return;
    initIngredients(foodItems);
  }, [foodItems]);

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    isInitialMount.current = false;
    setIngredients((preIng) =>
      preIng.filter((ing) => ing.food_name !== ingredient.food_name)
    );
    removeFoodItem(ingredient.food_name);
  };
  const handleUpdateIngredient = (ingredient: Ingredient) => {
    isInitialMount.current = false;
    setIngredients((preIng) =>
      preIng.map((ing) => {
        if (ing.food_name !== ingredient.food_name) return ing;
        return ingredient;
      })
    );
    updateFoodItem({
      food_name: ingredient.food_name,
      selected_qty: ingredient.selectedQty,
      selected_unit: ingredient.selectedUnit,
    });
  };

  const initIngredients = async (ingredientShorts: IngredientShort[]) => {
    ingredientShorts.forEach(async (ingredientShort) => {
      const ingredient = await getIngredient(ingredientShort);
      if (!ingredient) return;
      ingredient.selectedQty = ingredientShort.selected_qty;
      ingredient.selectedUnit = ingredientShort.selected_unit;
      setIngredients((preIngredients) => [
        ...new Set([...preIngredients, ingredient]),
      ]);
    });
  };

  const handleAddIngredients = <T extends { food_name: string }>(
    ingredientSummaries: T[]
  ) => {
    ingredientSummaries.forEach((ingredientSummary) =>
      handleAddIngredient(ingredientSummary)
    );
  };

  const handleAddIngredient = async <T extends { food_name: string }>(
    ingredientSummary: T
  ) => {
    isInitialMount.current = false;
    const ingredient = await getIngredient(ingredientSummary);
    if (!ingredient) return;
    setIngredients((preIngredients) => {
      const index = preIngredients.findIndex(
        (ing) => ing.food_name === ingredient.food_name
      );
      if (index >= 0) return preIngredients;
      return [...new Set([...preIngredients, ingredient])];
    });
    addFoodItem({
      food_name: ingredient.food_name,
      selected_qty: ingredient.selectedQty,
      selected_unit: ingredient.selectedUnit,
    });
  };

  const totalMealNutrientCount = useMemo(() => {
    const totalNutrients = ingredients.reduce<Nutrients>(
      (total, cur) => {
        const keys = Object.keys(total) as Array<keyof Nutrients>;
        keys.forEach((nutrient) => {
          const measure = cur.alt_measures.find(
            (measure) => measure.measure === cur.selectedUnit
          );
          if (!measure) return total;

          const servingPerQty = measure.serving_weight / measure.qty;
          const ratio =
            (cur.selectedQty * servingPerQty) / cur.serving_weight_grams;
          return (total[nutrient] += cur[nutrient] * ratio);
        });
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

  return {
    ingredients,
    removeIngredient: handleRemoveIngredient,
    updateIngredient: handleUpdateIngredient,
    addIngredients: handleAddIngredients,
    totalMealNutrientCount,
  };
};

export default useIngredients;
