import { useEffect, useMemo, useReducer } from "react";
import { getTotalNutrientCount } from "../common/util";
import { getIngredient } from "../services/ingredient";
import { Ingredient, IngredientShort } from "../types";

interface State {
  loading: boolean;
  error?: string;
  initializing: boolean;
  ingredients: Ingredient[];
}
/**
 * @typedef {object} Action - The possible actions that can be dispatched to update the state of the useIngredients hook
 * @property {string} type - The type of action being dispatched
 * @property {string} [payload.error] - Optional error message if the action type is "SET_ERROR"
 * @property {Ingredient} [payload.ingredient] - Optional Ingredient object if the action type is "ADD_INGREDIENT", "REMOVE_INGREDIENT", or "UPDATE_INGREDIENT"
 * @property {Ingredient[]} [payload.ingredients] - Optional array of Ingredient objects if the action type is "ADD_INGREDIENTS" or "INIT_INGREDIENTS"
 */
type Action =
  | { type: "SET_LOADING" }
  | { type: "COMPLETE_INIT" }
  | { type: "SET_ERROR"; payload: { error: string } }
  | { type: "ADD_INGREDIENT"; payload: { ingredient: Ingredient } }
  | { type: "REMOVE_INGREDIENT"; payload: { ingredient: Ingredient } }
  | { type: "UPDATE_INGREDIENT"; payload: { ingredient: Ingredient } }
  | {
      type: "ADD_INGREDIENTS";
      payload: { ingredients: Ingredient[] };
    }
  | {
      type: "INIT_INGREDIENTS";
      payload: { ingredients: Ingredient[] };
    }
  | {
      type: "RESET_INGREDIENTS";
    };

/**
 * @function reducer
 * @description A reducer function used to update the state of the useIngredients hook based on dispatched actions
 * @param {State} state - The current state of the hook
 * @param {Action} action - The action being dispatched
 * @returns {State} The updated state of the hook
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case "COMPLETE_INIT":
      return {
        ...state,
        initializing: false,
        loading: false,
        error: undefined,
      };
    case "ADD_INGREDIENT":
      return {
        ...state,
        initializing: false,
        loading: false,
        error: undefined,
        ingredients: [...state.ingredients, action.payload.ingredient],
      };
    case "REMOVE_INGREDIENT":
      return {
        ...state,
        initializing: false,
        loading: false,
        error: undefined,
        ingredients: state.ingredients.filter(
          (ing) => ing.food_name !== action.payload.ingredient.food_name
        ),
      };
    case "UPDATE_INGREDIENT":
      return {
        ...state,
        initializing: false,
        loading: false,
        error: undefined,
        ingredients: state.ingredients.map((ing) =>
          ing.food_name === action.payload.ingredient.food_name
            ? action.payload.ingredient
            : ing
        ),
      };
    case "ADD_INGREDIENTS":
      return {
        ...state,
        initializing: false,
        loading: false,
        error: undefined,
        ingredients: [
          ...new Set([...state.ingredients, ...action.payload.ingredients]),
        ],
      };
    case "INIT_INGREDIENTS":
      return {
        initializing: true,
        loading: false,
        error: undefined,
        ingredients: [...new Set(action.payload.ingredients)],
      };
    case "RESET_INGREDIENTS":
      return {
        initializing: false,
        loading: false,
        error: undefined,
        ingredients: [],
      };
    default:
      return state;
  }
};

/**
 * A custom React hook that manages a list of meal ingredients.
 *
 * @param {IngredientShort[]} initialIngredients - An array of short ingredient objects representing the initial state of the ingredient list.
 *
 * @returns {{
 *   initializing: boolean,
 *   ingredients: Ingredient[],
 *   removeIngredient: (ingredient: Ingredient) => void,
 *   updateIngredient: (ingredient: Ingredient) => void,
 *   addIngredients: (ingredientSummaries: { food_name: string }[]) => Promise<void>,
 *   resetIngredients: () => Promise<void>,
 *   totalMealNutrientCount: Nutrient[],
 * }} An object containing:
 *   - `initializing`: A boolean indicating whether the hook is currently initializing.
 *   - `ingredients`: An array of `Ingredient` objects representing the current list of ingredients.
 *   - `removeIngredient`: A function that removes an ingredient from the list.
 *   - `updateIngredient`: A function that updates an ingredient in the list.
 *   - `addIngredients`: A function that adds new ingredients to the list.
 *   - `resetIngredients`: A function that resets the ingredient list to its initial state.
 *   - `totalMealNutrientCount`: An array of `Nutrient` objects representing the total nutrient count of all ingredients in the list.
 */
const useIngredients = (initialIngredients: IngredientShort[]) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    initializing: true,
    ingredients: [],
  });

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    dispatch({ type: "REMOVE_INGREDIENT", payload: { ingredient } });
  };

  const handleUpdateIngredient = (ingredient: Ingredient) => {
    dispatch({ type: "UPDATE_INGREDIENT", payload: { ingredient } });
  };

  const handleAddIngredients = async (
    ingredientSummaries: { food_name: string }[]
  ) => {
    dispatch({ type: "SET_LOADING" });
    const newIngredients = await Promise.all(
      ingredientSummaries.map((ing) => getIngredient(ing))
    );

    const filteredIngredient: Ingredient[] = newIngredients.filter(
      (ingredient): ingredient is Ingredient => {
        return ingredient !== undefined;
      }
    );

    dispatch({
      type: "ADD_INGREDIENTS",
      payload: { ingredients: filteredIngredient },
    });
  };

  const handleInitIngredients = async (
    ingredientSummaries: IngredientShort[]
  ) => {
    dispatch({ type: "SET_LOADING" });
    const newIngredients = await Promise.all(
      ingredientSummaries.map(async (ing) => {
        const fetchedIngredient = await getIngredient(ing);
        if (!fetchedIngredient) return;
        return {
          ...fetchedIngredient,
          selected_qty: ing.selected_qty,
          selected_unit: ing.selected_unit,
        };
      })
    );

    const filteredIngredient: Ingredient[] = newIngredients.filter(
      (ingredient): ingredient is Ingredient => {
        return ingredient !== undefined;
      }
    );

    dispatch({
      type: "INIT_INGREDIENTS",
      payload: { ingredients: filteredIngredient },
    });
  };
  const handleResetIngredients = async () => {
    dispatch({ type: "RESET_INGREDIENTS" });
  };

  useEffect(() => {
    handleInitIngredients(initialIngredients);
  }, []);

  const totalMealNutrientCount = useMemo(() => {
    const totalNutrients = getTotalNutrientCount(state.ingredients);
    return totalNutrients;
  }, [state.ingredients]);

  return {
    initializing: state.initializing,
    ingredients: state.ingredients,
    removeIngredient: handleRemoveIngredient,
    updateIngredient: handleUpdateIngredient,
    addIngredients: handleAddIngredients,
    resetIngredients: handleResetIngredients,
    totalMealNutrientCount,
  };
};

export default useIngredients;
