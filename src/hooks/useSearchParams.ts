import { useEffect, useState } from "react";

interface FoodItem {
  food_name: string;
  selected_qty: number;
  selected_unit: string;
}

const useSearchParams = (): [
  FoodItem[],
  (foods: FoodItem[]) => void,
  (foodName: string) => void,
  (foodName: string, newFood: FoodItem) => void,
  (newFood: FoodItem) => void
] => {
  const [searchParams, setSearchParams] = useState<FoodItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const foodItems: FoodItem[] = [];

    params.getAll("food").forEach((food) => {
      const [food_name, selected_qty, selected_unit] = food.split("|");
      foodItems.push({
        food_name,
        selected_qty: Number(selected_qty),
        selected_unit,
      });
    });

    setSearchParams(foodItems);
  }, []);

  const setFoodItems = (foods: FoodItem[]): void => {
    const params = new URLSearchParams();
    foods.forEach(({ food_name, selected_qty, selected_unit }) => {
      params.append("food", `${food_name}|${selected_qty}|${selected_unit}`);
    });

    const search = params.toString();
    const url = `${window.location.pathname}?${search}`;
    window.history.replaceState(null, "", url);

    setSearchParams(foods);
  };

  const removeFoodByName = (foodName: string): void => {
    const updatedFoods = searchParams.filter(
      (food) => food.food_name !== foodName
    );
    setFoodItems(updatedFoods);
  };

  const updateFoodByName = (foodName: string, newFood: FoodItem): void => {
    const updatedFoods = searchParams.map((food) => {
      if (food.food_name === foodName) {
        return newFood;
      }
      return food;
    });
    setFoodItems(updatedFoods);
  };

  const addFoodItem = (newFood: FoodItem): void => {
    setFoodItems([...searchParams, newFood]);
  };

  return [
    searchParams,
    setFoodItems,
    removeFoodByName,
    updateFoodByName,
    addFoodItem,
  ];
};
export default useSearchParams;
