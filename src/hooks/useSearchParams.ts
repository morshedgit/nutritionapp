import { useState } from "react";
import { IngredientShort } from "../types";

const ITEM_NAME = "ingredient";
const ITEM_TITLE = "title";
/**
 * A custom React hook for managing URL search parameters related to ingredients and meal titles.
 * @returns An object containing the current search parameter string, meal title, ingredients list,
 * and functions for updating the title and ingredients.
 */
const useSearchParams = () => {
  const params = new URLSearchParams(window.location.search);

  // Extract the meal title from the search parameters or set it to an empty string.
  const titleParam = params.get(ITEM_TITLE);
  const [title, setTitle] = useState(titleParam ?? "");

  // Extract the list of ingredients from the search parameters and convert them to an array of objects.
  const ingredients: IngredientShort[] = [];
  const foodItemParams = params
    .getAll(ITEM_NAME)
    .map((item) => item.split("|"));
  for (const [food_name, selected_unit, selected_qty] of foodItemParams) {
    ingredients.push({
      food_name,
      selected_unit,
      selected_qty: Number(selected_qty),
    });
  }

  /**
   * A function for updating the list of ingredients in the URL search parameters.
   * @param items The updated list of ingredients.
   */
  const handleUpdateIngredients = (items: IngredientShort[]) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(ITEM_NAME);
    items.forEach((item) => {
      params.append(
        ITEM_NAME,
        `${item.food_name}|${
          item.selected_unit
        }|${item.selected_qty.toString()}`
      );
    });
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  /**
   * A function for updating the meal title in the URL search parameters.
   * @param titleArg The new title to set.
   */
  const handleUpdateTitle = (titleArg: string) => {
    const params = new URLSearchParams(window.location.search);
    setTitle(titleArg);
    params.set(ITEM_TITLE, titleArg);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return {
    paramsString: params.toString(),
    title,
    onUpdateTitle: handleUpdateTitle,
    ingredients,
    onUpdateIngredients: handleUpdateIngredients,
  };
};

export default useSearchParams;
