import { useState, useEffect, useRef } from "react";
import { IngredientShort } from "../types";

function useSearchParams() {
  const [searchParams, setSearchParams] = useState<IngredientShort[]>([]);
  const intialRef = useRef(true);

  useEffect(() => {
    const searchParamsString = window.location.search.substring(1);
    const params = new URLSearchParams(searchParamsString);
    const foodItems = params
      .getAll("foodItem")
      .map((item: string) => JSON.parse(item));
    setSearchParams(foodItems);
  }, []);

  const addOrUpdateParam = (param: IngredientShort) => {
    const index = searchParams.findIndex(
      (item) => item.food_name === param.food_name
    );
    if (index >= 0) {
      setSearchParams([
        ...searchParams.slice(0, index),
        param,
        ...searchParams.slice(index + 1),
      ]);
    } else {
      setSearchParams([...searchParams, param]);
    }
  };

  const removeParam = (name: string) => {
    const index = searchParams.findIndex((item) => item.food_name === name);
    if (index >= 0) {
      setSearchParams([
        ...searchParams.slice(0, index),
        ...searchParams.slice(index + 1),
      ]);
    }
  };

  useEffect(() => {
    if (intialRef.current) {
      intialRef.current = false;
      return;
    }
    const params = new URLSearchParams();
    searchParams.forEach((param) => {
      params.append("foodItem", JSON.stringify(param));
    });
    const search = params.toString() ? `?${params.toString()}` : "";
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${search}${window.location.hash}`
    );
  }, [searchParams]);

  return { searchParams, addOrUpdateParam, removeParam };
}

export default useSearchParams;
