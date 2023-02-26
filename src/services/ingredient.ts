import { Ingredient } from "../types";

class Cache {
  storeKey: string;
  constructor(key: string) {
    this.storeKey = key;
  }
  setItem<T>(key: string, value: T) {
    let storeString = localStorage.getItem(this.storeKey);
    if (!storeString) {
      const defaultStoreValue = JSON.stringify({});
      localStorage.setItem(this.storeKey, defaultStoreValue);
      storeString = defaultStoreValue;
    }
    const store: { [key: string]: T } = JSON.parse(storeString);
    store[key] = value;
    localStorage.setItem(this.storeKey, JSON.stringify(store));
  }
  getItem<T>(key: string) {
    let storeString = localStorage.getItem(this.storeKey);
    if (!storeString) return;
    const store: { [key: string]: T } = JSON.parse(storeString);
    const value = store[key];
    if (!value) return;
    return value;
  }
}

const ingredientCache = new Cache("ingredientCache");

export const getIngredient = async <T extends { food_name: string }>(
  ingredientSummary: T
) => {
  let ingredient = ingredientCache.getItem<Ingredient>(
    ingredientSummary.food_name
  );
  if (ingredient) {
    ingredient.selectedQty = ingredient.serving_qty;
    ingredient.selectedUnit = ingredient.serving_unit;
    return ingredient;
  }
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
        "x-app-id": import.meta.env.VITE_NUTRITIONIX_APP_ID!,
        "x-app-key": import.meta.env.VITE_NUTRITIONIX_APP_KEY!,
        "x-remote-user-id": "0",
      },
      body,
    }
  );
  const data = await response.json();
  ingredient = data.foods.find(
    (food: Ingredient) => food.food_name === ingredientSummary.food_name
  ) as Ingredient;
  if (!ingredient) return;
  ingredientCache.setItem(ingredient.food_name, ingredient);
  ingredient.selectedQty = ingredient.serving_qty;
  ingredient.selectedUnit = ingredient.serving_unit;
  return ingredient;
};

export const getSearchResults = async ({
  query,
  signal,
}: {
  query: string;
  signal: AbortSignal;
}) => {
  const response = await fetch(
    `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`,
    {
      headers: {
        "x-app-id": import.meta.env.VITE_NUTRITIONIX_APP_ID!,
        "x-app-key": import.meta.env.VITE_NUTRITIONIX_APP_KEY!,
        "x-remote-user-id": "0",
      },
      signal,
    }
  );
  const data = await response.json();
  return data;
};
