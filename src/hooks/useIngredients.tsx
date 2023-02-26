import { useMemo, useRef, useState } from "react";
import { getIngredient } from "../services/ingredient";
import { Ingredient, Nutrients } from "../types";

const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const isInitialMount = useRef(true);

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    isInitialMount.current = false;
    setIngredients((preIng) =>
      preIng.filter((ing) => ing.food_name !== ingredient.food_name)
    );
  };
  const handleUpdateIngredient = (ingredient: Ingredient) => {
    isInitialMount.current = false;
    setIngredients((preIng) =>
      preIng.map((ing) => {
        if (ing.food_name !== ingredient.food_name) return ing;
        return ingredient;
      })
    );
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
