import { Ingredient, Nutrients } from "../types";

/**
 * A utility function that creates a number formatter using the Intl API to format a number with a fixed number of decimal places.
 * @function
 * @name numberFormatter
 * @returns {Intl.NumberFormat} The number formatter instance.
 * @example
 * // Returns "1,234.56"
 * numberFormatter.format(1234.56);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat | Intl.NumberFormat documentation}
 */
export const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Calculates the total amount of nutrients in a given array of ingredients,
 * based on the selected serving size and quantity for each ingredient.
 * @param {Ingredient[]} ingredients - An array of Ingredient objects, each representing an ingredient in the recipe.
 * @returns {Nutrients} - An object containing the total nutrient amounts for the recipe, based on the selected serving size and quantity for each ingredient.
 */
export const getTotalNutrientCount = (ingredients: Ingredient[]) => {
  const totalNutrients = ingredients.reduce<Nutrients>(
    (total, cur) => {
      const keys = Object.keys(total) as Array<keyof Nutrients>;
      keys.forEach((nutrient) => {
        const measure = cur.alt_measures.find(
          (measure) => measure.measure === cur.selected_unit
        );
        if (!measure) return total;

        const servingPerQty = measure.serving_weight / measure.qty;
        const ratio =
          (cur.selected_qty * servingPerQty) / cur.serving_weight_grams;
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
};

/**
 * A class that provides caching functionality using the browser's localStorage API.
 * @class
 */
export class LocalCache {
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
  /**
   * Retrieves all items from the cache.
   * @template T
   * @returns {T|undefined} The cached item, or undefined if the key is not found in the cache.
   */
  getAll<T>() {
    let storeString = localStorage.getItem(this.storeKey);
    if (!storeString) return;
    const store: { [key: string]: T } = JSON.parse(storeString);
    return store;
  }
  /**
   * Removes an item from the cache.
   * @template T
   * @param {string} key - The key used to store the item in the cache.
   * @returns {T|undefined} The cached item, or undefined if the key is not found in the cache.
   */
  removeItem<T>(key: string) {
    let storeString = localStorage.getItem(this.storeKey);
    if (!storeString) return;
    const store: { [key: string]: T } = JSON.parse(storeString);
    delete store[key];
    localStorage.setItem(this.storeKey, JSON.stringify(store));
  }
}
