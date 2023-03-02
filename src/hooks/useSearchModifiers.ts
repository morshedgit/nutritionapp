import { useState } from "react";
import useSearchParams, { QueryParams } from "./useSearchParams";

type FoodItem = {
  food_name: string;
  unit: string;
  qty: number;
};

type UseSearchModifiers = {
  title?: string;
  addTitle?: (title: string) => void;
  removeTitle?: () => void;
  foodItemList: FoodItem[];
  addFoodItem?: (foodItem: FoodItem) => void;
  removeFoodItem?: (foodItem: FoodItem) => void;
};
const initialValues = { title: "", foodItem: [] } satisfies QueryParams;
const useSearchModifiers = (): UseSearchModifiers => {
  const { searchParams, setQueryParam } = useSearchParams(initialValues);
  const [title, setTitle] = useState(searchParams.title as string);
  const [foodItemList, setFoodItemList] = useState<FoodItem[]>([]);

  const addTitle = (title: string) => {
    setTitle(title);
    setQueryParam("title", title);
  };

  const removeTitle = () => {
    setTitle("");
    setQueryParam("title", undefined);
  };

  const addFoodItem = (newfoodItem: FoodItem) => {
    setFoodItemList((prev) => [...prev, newfoodItem]);
    const newFoodItems = [...foodItemList, newfoodItem];
    setQueryParam(
      "foodItem",
      newFoodItems
        .map((item) => `${item.food_name}-${item.unit}-${item.qty}`)
        .join(",")
    );
  };

  const removeFoodItem = (foodItem: FoodItem) => {
    const newFoodItems = foodItemList.filter(
      (item: FoodItem) => item.food_name !== foodItem.food_name
    );
    setQueryParam(
      "foodItem",
      newFoodItems
        .map((item) => `${item.food_name}-${item.unit}-${item.qty}`)
        .join(",")
    );
  };

  return {
    title,
    addTitle,
    removeTitle,
    foodItemList,
    addFoodItem,
    removeFoodItem,
  };
};

export default useSearchModifiers;
