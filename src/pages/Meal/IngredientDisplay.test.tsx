import { vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";

import { Ingredient } from "../../types";
import IngredientDisplay from "./IngredientDisplay";
import "@testing-library/jest-dom";
import { IngredientContext } from "../../components/IngredientProvider";

const ingredient: Ingredient = {
  food_name: "Almonds",
  brand_name: null,
  serving_qty: 1,
  serving_unit: "oz",
  serving_weight_grams: 28.35,
  nf_calories: 160,
  nf_total_fat: 14,
  nf_saturated_fat: 1,
  nf_cholesterol: 0,
  nf_sodium: 0,
  nf_total_carbohydrate: 6,
  nf_dietary_fiber: 4,
  nf_sugars: 1,
  nf_protein: 6,
  nf_potassium: 200,
  nf_p: 160,
  full_nutrients: [
    {
      attr_id: 203,
      value: 6,
    },
    {
      attr_id: 204,
      value: 14,
    },
    {
      attr_id: 205,
      value: 6,
    },
    {
      attr_id: 208,
      value: 160,
    },
    {
      attr_id: 269,
      value: 4,
    },
    {
      attr_id: 291,
      value: 1,
    },
    {
      attr_id: 301,
      value: 6,
    },
    {
      attr_id: 303,
      value: 200,
    },
    {
      attr_id: 304,
      value: 160,
    },
  ],
  tags: {
    item: "Almonds",
    measure: null,
    quantity: "1.000",
    food_group: 9003,
    tag_id: 267,
  },
  alt_measures: [
    {
      serving_weight: 28.35,
      measure: "oz",
      seq: 1,
      qty: 1,
    },
    {
      serving_weight: 10,
      measure: "nuts",
      seq: 80,
      qty: 1,
    },
  ],
  photo: {
    thumb: "https://d2xdmhkmkbyw75.cloudfront.net/267_thumb.jpg",
    highres: "https://d2xdmhkmkbyw75.cloudfront.net/267_highres.jpg",
    is_user_uploaded: false,
  },
  selected_qty: 1,
  selected_unit: "oz",
};

describe("IngredientDisplay component", () => {
  test("renders ingredient name and image", () => {
    const { getByText, getByAltText } = render(
      <IngredientDisplay ingredient={ingredient} />
    );

    expect(getByText(ingredient.food_name)).toBeInTheDocument();
    expect(
      getByAltText(`${ingredient.food_name} thumbnail`)
    ).toBeInTheDocument();
  });

  test("renders calories with selected quantity and unit", () => {
    const { getByText, getByDisplayValue } = render(
      <IngredientDisplay ingredient={ingredient} />
    );

    expect(getByText("Almonds")).toBeInTheDocument();
    expect(getByText("160.00")).toBeInTheDocument();
    expect(getByDisplayValue(1)).toBeInTheDocument();
    expect(getByDisplayValue("oz")).toBeInTheDocument();
  });

  test("updates quantity when input changes", () => {
    const updateIngredient = vi.fn();
    const mockIngredientContext: any = {};
    const { getByDisplayValue } = render(
      <IngredientContext.Provider
        value={{ ...mockIngredientContext, updateIngredient }}
      >
        <IngredientDisplay ingredient={ingredient} />
      </IngredientContext.Provider>
    );

    const qtyInput = getByDisplayValue(1);

    fireEvent.change(qtyInput, { target: { value: "2" } });

    expect(updateIngredient).toHaveBeenCalledWith({
      ...ingredient,
      selectedQty: 2,
    });
  });

  test("updates unit when select changes", () => {
    const updateIngredient = vi.fn();
    const mockIngredientContext: any = {};
    const { getByDisplayValue } = render(
      <IngredientContext.Provider
        value={{ ...mockIngredientContext, updateIngredient }}
      >
        <IngredientDisplay ingredient={ingredient} />
      </IngredientContext.Provider>
    );

    const unitSelect = getByDisplayValue("oz");

    fireEvent.change(unitSelect, { target: { value: "oz" } });

    expect(updateIngredient).toHaveBeenCalledWith({
      ...ingredient,
      selectedUnit: "oz",
    });
  });

  test("toggles showMore state when show more button is clicked", () => {
    const { getByText, queryByText } = render(
      <IngredientDisplay ingredient={ingredient} />
    );

    const showMoreButton = getByText("Learn More");

    expect(queryByText("Total fat:")).not.toBeInTheDocument();

    fireEvent.click(showMoreButton);

    expect(getByText("Total fat:")).toBeInTheDocument();

    fireEvent.click(showMoreButton);

    expect(queryByText("Total fat:")).not.toBeInTheDocument();
  });
});
