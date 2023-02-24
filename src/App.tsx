import { useEffect, useState } from "react";
import Ingredients from "./components/Ingredients";
import Search, { IngredientSummary } from "./components/search";
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

const ingredientCache = new Map<string, Ingredient>();

function App() {
  const [ingredientSummaries, setIngredientSummaries] = useState<
    IngredientSummary[]
  >([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const handleRemoveIngredient = (ingredient: Ingredient) => {
    setIngredientSummaries((preIng) =>
      preIng.filter((ing) => ing.food_name !== ingredient.food_name)
    );
  };

  const handleAddIngredient = (ingredientSummary: IngredientSummary) => {
    setIngredientSummaries((preIng) => [...preIng, ingredientSummary]);
    addIngredients(ingredientSummary);
  };

  // const removeIngredients = async (ingredientSummary: IngredientSummary) => {
  //   setIngredients((preIngredients) =>
  //     preIngredients.filter(
  //       (ingredient) => ingredient.food_name !== ingredientSummary.food_name
  //     )
  //   );
  // };
  const addIngredients = async (ingredientSummary: IngredientSummary) => {
    const ingredient = ingredientCache.get(ingredientSummary.food_name);
    if (ingredient) {
      setIngredients((preIngredients) => [...preIngredients, ingredient]);
      return;
    }

    try {
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          method: "POST",
          headers: {
            "x-app-id": " 9aa2f7ac",
            "x-app-key": "b75ff2973f91f1f6521c6d863bfb8a84",
            "x-remote-user-id": "0",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: ingredientSummary.food_name,
            locale: "en-US",
          }),
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
  return (
    <main className="w-full pt-10">
      <Search onAdd={handleAddIngredient} />

      <Ingredients
        ingredients={ingredients}
        onRemove={handleRemoveIngredient}
      />
    </main>
  );
}

export default App;
