import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSearchParams from "../hooks/useSearchParams";
import { Ingredient, IngredientSummary, Nutrients } from "../types";

export const IngredientContext = createContext<{
  ingredients: Ingredient[];
  removeIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (ingredient: Ingredient) => void;
  addIngredient: (ingredientSummaries: IngredientSummary[]) => void;
  totalMealNutrientCount: Nutrients;
}>({
  ingredients: [],
  removeIngredient: () => {},
  updateIngredient: () => {},
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

  // const [
  //   searchParams,
  //   setFoodItems,
  //   removeFoodByName,
  //   updateFoodByName,
  //   addFoodItem,
  // ] = useSearchParams();

  // useEffect(() => {
  //   console.log(searchParams);
  //   // handleAddIngredients(searchParams);
  // }, [searchParams]);

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    setIngredients((preIng) =>
      preIng.filter((ing) => ing.food_name !== ingredient.food_name)
    );
    // removeFoodByName(ingredient.food_name);
  };
  const handleUpdateIngredient = (ingredient: Ingredient) => {
    setIngredients((preIng) =>
      preIng.map((ing) => {
        if (ing.food_name !== ingredient.food_name) return ing;
        return ingredient;
      })
    );
    // updateFoodByName(ingredient.food_name, {
    //   food_name: ingredient.food_name,
    //   selected_qty: ingredient.selectedQty,
    //   selected_unit: ingredient.selectedUnit,
    // });
  };

  const handleAddIngredients = <T extends { food_name: string }>(
    ingredientSummaries: T[]
  ) => {
    ingredientSummaries.forEach((ingredientSummary) =>
      addIngredient(ingredientSummary)
    );
  };

  const addIngredient = async <T extends { food_name: string }>(
    ingredientSummary: T
  ) => {
    const ingredient = ingredientCache.get(ingredientSummary.food_name);
    if (ingredient) {
      ingredient.selectedQty = ingredient.serving_qty;
      ingredient.selectedUnit = ingredient.serving_unit;
      setIngredients((preIngredients) => [
        ...new Set([...preIngredients, ingredient]),
      ]);
      // addFoodItem({
      //   food_name: ingredient.food_name,
      //   selected_qty: ingredient.selectedQty,
      //   selected_unit: ingredient.selectedUnit,
      // });
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
      ingredient.selectedQty = ingredient.serving_qty;
      ingredient.selectedUnit = ingredient.serving_unit;
      setIngredients((preIngredients) => [
        ...new Set([...preIngredients, ingredient]),
      ]);

      // addFoodItem({
      //   food_name: ingredient.food_name,
      //   selected_qty: ingredient.selectedQty,
      //   selected_unit: ingredient.selectedUnit,
      // });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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

  const value = {
    ingredients,
    removeIngredient: handleRemoveIngredient,
    updateIngredient: handleUpdateIngredient,
    addIngredient: handleAddIngredients,
    totalMealNutrientCount,
  };

  return (
    <IngredientContext.Provider value={value}>
      {props.children}
    </IngredientContext.Provider>
  );
};

export default IngredientProvider;
