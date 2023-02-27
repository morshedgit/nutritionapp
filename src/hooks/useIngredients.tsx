import { useMemo, useRef, useState } from "react";
import { getIngredient } from "../services/ingredient";
import { Ingredient, Nutrients } from "../types";

/**
 * A hook that manages a list of ingredients for a meal and their total nutrient count.
 *
 * @returns An object with the following properties:
 * - ingredients: An array of Ingredient objects representing the meal's ingredients.
 * - removeIngredient: A function that removes an Ingredient from the meal.
 * - updateIngredient: A function that updates an Ingredient in the meal.
 * - addIngredients: A function that adds multiple Ingredients to the meal.
 * - totalMealNutrientCount: An object representing the total nutrient count for the meal.
 */
const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const isInitialMount = useRef(true);

  /**
   * Removes an Ingredient from the meal.
   *
   * @param {Ingredient} ingredient - The Ingredient to remove.
   */
  const handleRemoveIngredient = (ingredient: Ingredient) => {
    isInitialMount.current = false;
    setIngredients((preIng) =>
      preIng.filter((ing) => ing.food_name !== ingredient.food_name)
    );
  };

  /**
   * Updates an Ingredient in the meal.
   *
   * @param {Ingredient} ingredient - The updated Ingredient.
   */
  const handleUpdateIngredient = (ingredient: Ingredient) => {
    isInitialMount.current = false;
    setIngredients((preIng) =>
      preIng.map((ing) => {
        if (ing.food_name !== ingredient.food_name) return ing;
        return ingredient;
      })
    );
  };

  /**
   * Adds multiple Ingredients to the meal.
   *
   * @template T - The type of the ingredient summaries.
   * @param {T[]} ingredientSummaries - An array of ingredient summaries to add.
   */
  const handleAddIngredients = <T extends { food_name: string }>(
    ingredientSummaries: T[]
  ) => {
    ingredientSummaries.forEach((ingredientSummary) =>
      handleAddIngredient(ingredientSummary)
    );
  };

  /**
   * Adds a single Ingredient to the meal.
   *
   * @template T - The type of the ingredient summary.
   * @param {T} ingredientSummary - The ingredient summary to add.
   */

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
  };

  /**
   * Calculates the total nutrient count for the meal.
   */
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
