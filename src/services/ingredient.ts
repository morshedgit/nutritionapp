import { Ingredient } from "../types";

/**
 * A class that provides caching functionality using the browser's localStorage API.
 * @class
 */
class Cache {
  storeKey: string;
  /**
   * @constructor
   * @param {string} key - The key to be used for storing items in the cache.
   */
  constructor(key: string) {
    this.storeKey = key;
  }

  /**
   * Adds an item to the cache.
   * @template T
   * @param {string} key - The key to be used for storing the item in the cache.
   * @param {T} value - The value to be stored in the cache.
   */
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

  /**
   * Retrieves an item from the cache.
   * @template T
   * @param {string} key - The key used to store the item in the cache.
   * @returns {T|undefined} The cached item, or undefined if the key is not found in the cache.
   */
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
