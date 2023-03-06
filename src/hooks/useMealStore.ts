import { useMemo, useState } from "react";
import { LocalCache } from "../common/util";
import { Meal } from "../types";

const mealStore = new LocalCache("mealStore");

interface MealStore {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (title: string) => void;
  updateMeal: (meal: Meal) => void;
}
/**
 * A hook that provides a meal store with CRUD operations for meals.
 * @returns {MealStore} The meal store object that contains meals and methods to manipulate them
 */
export const useMealStore = (): MealStore => {
  const [meals, setMeals] = useState<Record<string, Meal>>(() => {
    const meals = mealStore.getAll<Meal>();
    if (!meals) return {};
    return meals;
  });

  const addMeal = (meal: Meal): void => {
    if (!meal?.title) return;
    setMeals((prev) => ({ ...prev, [meal.title]: meal }));
    mealStore.setItem(meal.title, meal);
  };

  const removeMeal = (title: string): void => {
    const { [title]: removedMeal, ...rest } = meals;
    setMeals(rest);
    mealStore.removeItem(title);
  };

  const updateMeal = (updatedMeal: Meal): void => {
    setMeals((prev) => ({ ...prev, [updatedMeal.title]: updatedMeal }));
    mealStore.removeItem(updatedMeal.title);
    mealStore.setItem(updatedMeal.title, updatedMeal);
  };

  const mealList = useMemo(() => Object.values(meals), [meals]);

  return {
    meals: mealList,
    addMeal,
    removeMeal,
    updateMeal,
  };
};
