import { useState } from "react";
import Ingredients from "./components/Ingredients";
import Search, { FoodData } from "./components/search";

function App() {
  const [ingredients, setIngredients] = useState<FoodData[]>([]);
  const handleRemoveIngredient = (ingredient: FoodData) => {
    setIngredients((preIng) =>
      preIng.filter((ing) => ing.food_name !== ingredient.food_name)
    );
  };

  const handleAddIngredient = (ingredient: FoodData) => {
    setIngredients((preIng) => [...preIng, ingredient]);
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
