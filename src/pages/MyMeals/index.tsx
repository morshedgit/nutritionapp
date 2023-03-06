import React, { useContext, useRef, useState } from "react";
import Icon from "../../components/Icon";
import { IngredientContext } from "../../components/IngredientProvider";

interface MyMealsProps {}
/**
 * The MyMeals component displays a list of saved meals with the ability to delete them.
 *
 * @component
 * @returns JSX.Element
 */
const MyMeals: React.FC<MyMealsProps> = () => {
  const { meals, removeMeal } = useContext(IngredientContext);

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string
  ) => {
    e.preventDefault();
    removeMeal(title);
  };

  return (
    <>
      <ul className="flex flex-col gap-2">
        {meals.map((meal) => (
          <li key={meal.title} className="bg-green-200 p-4 rounded-lg">
            <a href={`/?${meal.path}`} className="flex items-center gap-2">
              <h4 className="flex-grow">{meal.title}</h4>
              <button
                onClick={(e) => handleDelete(e, meal.title)}
                className="hover:text-red-500 active:text-red-600"
              >
                <Icon title="close" />
              </button>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyMeals;
