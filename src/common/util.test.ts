import { Ingredient } from "../types";
import { getTotalNutrientCount, numberFormatter } from "./util";

test("numberFormatter should format a number with a fixed number of decimal places", () => {
  const formattedNumber = numberFormatter.format(1234.56);
  expect(formattedNumber).toBe("1,234.56");
});

const ingredients: Ingredient[] = [
  {
    food_name: "Broccoli",
    brand_name: null,
    serving_qty: 1,
    serving_unit: "cup chopped",
    serving_weight_grams: 91,
    nf_calories: 55,
    nf_total_fat: 0.6,
    nf_saturated_fat: 0.1,
    nf_cholesterol: 0,
    nf_sodium: 81,
    nf_total_carbohydrate: 11,
    nf_dietary_fiber: 5.1,
    nf_sugars: 2.2,
    nf_protein: 4.3,
    nf_potassium: 457,
    nf_p: 116,
    tags: {
      item: "broccoli",
      measure: null,
      quantity: "1.0",
      food_group: 4,
      tag_id: 510,
    },
    alt_measures: [
      {
        serving_weight: 91,
        measure: "cup chopped",
        seq: 1,
        qty: 1,
      },
      {
        serving_weight: 156,
        measure: 'stalk, medium (7-1/2" - 8" long)',
        seq: 2,
        qty: 1,
      },
      {
        serving_weight: 151,
        measure: 'head, small (about 5" dia)',
        seq: 3,
        qty: 1,
      },
      {
        serving_weight: 180,
        measure: 'head, medium (about 5-3/4" dia)',
        seq: 4,
        qty: 1,
      },
      {
        serving_weight: 766,
        measure: 'head, large (about 7" dia)',
        seq: 5,
        qty: 1,
      },
      {
        serving_weight: 28.35,
        measure: "spear",
        seq: 8,
        qty: 1,
      },
    ],
    photo: {
      thumb:
        "https://d1r9wva3zcpswd.cloudfront.net/55ca585dddc488c32d7b1f2b.jpeg",
      highres:
        "https://d1r9wva3zcpswd.cloudfront.net/55ca585dddc488c32d7b1f2b.jpeg",
      is_user_uploaded: false,
    },
    selected_qty: 2,
    selected_unit: "cup chopped",
    full_nutrients: [],
  },
  {
    food_name: "Banana",
    brand_name: null,
    serving_qty: 1,
    serving_unit: 'medium (7" to 7-7/8" long)',
    serving_weight_grams: 118,
    nf_calories: 105,
    nf_total_fat: 0.4,
    nf_saturated_fat: 0.1,
    nf_cholesterol: 0,
    nf_sodium: 1,
    nf_total_carbohydrate: 27,
    nf_dietary_fiber: 3.1,
    nf_sugars: 14.4,
    nf_protein: 1.3,
    nf_potassium: 422,
    nf_p: 26,
    tags: {
      item: "banana",
      measure: null,
      quantity: "1.0",
      food_group: 9003,
      tag_id: 489,
    },
    alt_measures: [
      {
        serving_weight: 101,
        measure: 'extra small (less than 6" long)',
        seq: 1,
        qty: 1,
      },
      {
        serving_weight: 118,
        measure: 'medium (7" to 7-7/8" long)',
        seq: 2,
        qty: 1,
      },
      {
        serving_weight: 136,
        measure: 'large (8" to 8-7/8" long)',
        seq: 3,
        qty: 1,
      },
      {
        serving_weight: 152,
        measure: 'extra large (9" or longer)',
        seq: 4,
        qty: 1,
      },
      {
        serving_weight: 90,
        measure: 'extra small (less than 6" long)',
        seq: 30,
        qty: 1,
      },
      {
        serving_weight: 111,
        measure: 'small (6" to 6-7/8" long)',
        seq: 40,
        qty: 1,
      },
      {
        serving_weight: 226,
        measure: "cup, mashed",
        seq: 50,
        qty: 1,
      },
      {
        serving_weight: 225,
        measure: "cup, sliced",
        seq: 60,
        qty: 1,
      },
      {
        serving_weight: 118,
        measure: 'medium (7" to 7-7/8" long)',
        seq: 70,
        qty: 1,
      },
      {
        serving_weight: 152,
        measure: 'large (8" to 8-7/8" long)',
        seq: 80,
        qty: 1,
      },
      {
        serving_weight: 136,
        measure: 'extra large (9" or longer)',
        seq: 90,
        qty: 1,
      },
    ],
    photo: {
      thumb: "https://d2xdmhkmkbyw75.cloudfront.net/489_thumb.jpg",
      highres: "https://d2xdmhkmkbyw75.cloudfront.net/489_highres.jpg",
      is_user_uploaded: false,
    },
    selected_qty: 2,
    selected_unit: 'medium (7" to 7-7/8" long)',
    full_nutrients: [],
  },
];

describe("getTotolNutrientCount", () => {
  test("returns correct nutrient count for single ingredient", () => {
    const nutrientCount = getTotalNutrientCount([ingredients[0]]);
    expect(nutrientCount).toEqual({
      nf_calories: 110,
      nf_total_fat: 1.2,
      nf_saturated_fat: 0.2,
      nf_cholesterol: 0,
      nf_sodium: 162,
      nf_total_carbohydrate: 22,
      nf_dietary_fiber: 10.2,
      nf_sugars: 4.4,
      nf_protein: 8.6,
      nf_potassium: 914,
    });
  });

  test("returns correct nutrient count for multiple ingredients", () => {
    const nutrientCount = getTotalNutrientCount(ingredients);
    expect(nutrientCount).toEqual({
      nf_calories: 320,
      nf_total_fat: 2,
      nf_saturated_fat: 0.4,
      nf_cholesterol: 0,
      nf_sodium: 164,
      nf_total_carbohydrate: 76,
      nf_dietary_fiber: 16.4,
      nf_sugars: 33.2,
      nf_protein: 11.2,
      nf_potassium: 1758,
    });
  });

  test("returns nutrient count as 0 for empty ingredient array", () => {
    const nutrientCount = getTotalNutrientCount([]);
    expect(nutrientCount).toEqual({
      nf_calories: 0,
      nf_total_fat: 0,
      nf_saturated_fat: 0,
      nf_cholesterol: 0,
      nf_sodium: 0,
      nf_total_carbohydrate: 0,
      nf_dietary_fiber: 0,
      nf_sugars: 0,
      nf_protein: 0,
      nf_potassium: 0,
    });
  });
});
