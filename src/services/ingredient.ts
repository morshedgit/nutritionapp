import { LocalCache } from "../common/util";
import { Ingredient } from "../types";

const ingredientCache = new LocalCache("ingredientCache");

/**
 * Retrieves detailed nutritional information for a given ingredient summary.
 * @async
 * @template T
 * @param {T} ingredientSummary - A summary of the ingredient to retrieve nutritional information for.
 * @returns {Promise<Ingredient|undefined>} A promise that resolves to the detailed nutritional information for the ingredient, or undefined if the information cannot be retrieved.
 */
export const getIngredient = async <T extends { food_name: string }>(
  ingredientSummary: T
) => {
  let ingredient = ingredientCache.getItem<Ingredient>(
    ingredientSummary.food_name
  );
  if (ingredient) {
    ingredient.selected_qty = ingredient.serving_qty;
    ingredient.selected_unit = ingredient.serving_unit;
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
  ingredient.selected_qty = ingredient.serving_qty;
  ingredient.selected_unit = ingredient.serving_unit;
  return ingredient;
};

/**
 * Retrieves search results for a given query string.
 * @async
 * @param {object} options - An object containing options for the search.
 * @param {string} options.query - The query string to search for.
 * @param {AbortSignal} options.signal - An AbortSignal object that can be used to cancel the request.
 * @returns {Promise<object>} A promise that resolves to the search results.
 */
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
