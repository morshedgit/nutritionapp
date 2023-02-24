import React, { useEffect, useState } from "react";
import { FoodData } from "./search";

type FoodListProps = {
  foodList: FoodData[];
  onAdd: (item: FoodData) => void;
  className?: string;
};

type FoodItem = FoodData & { selected: boolean };

const FoodList: React.FC<FoodListProps> = ({ foodList, className, onAdd }) => {
  return (
    <ul
      tabIndex={-1}
      className={`grid grid-cols-1 gap-2 max-h-96 overflow-y-scroll shadow-lg rounded-lg bg-white ${className}`}
    >
      {foodList.map((foodData) => (
        <li key={`${foodData.food_name}${foodData.tag_id}`}>
          <button
            onClick={() => onAdd(foodData)}
            className="w-full unset-all flex border-b-2"
          >
            <img
              className="w-24 h-24 object-cover"
              src={foodData.photo.thumb}
              alt={`${foodData.food_name} thumbnail`}
            />
            <div className="flex-grow px-4 py-2 flex flex-col items-start hover:bg-blue-300 leading-[0] active:bg-blue-400">
              <div>
                <h3 className="text-gray-800 font-bold text-xl mb-2">
                  {foodData.food_name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                {foodData.serving_qty} {foodData.serving_unit}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-bold">Tag:</span> {foodData.tag_name}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FoodList;
