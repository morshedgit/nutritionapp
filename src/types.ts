type Serving = {
  serving_weight: number;
  measure: string;
  seq: number;
  qty: number;
};
type Tag = {
  item: string;
  measure: null;
  quantity: string;
  food_group: number;
  tag_id: number;
};

type Attribute = {
  attr_id: number;
  value: number;
};
type Photo = {
  thumb: string;
  highres: string;
  is_user_uploaded: boolean;
};

export type Ingredient = {
  food_name: string;
  brand_name: string | null;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium: number;
  nf_p: number;
  full_nutrients: Attribute[];
  tags: Tag;
  alt_measures: Serving[];
  photo: Photo;
} & {
  selected_qty: number;
  selected_unit: string;
};

export type Nutrients = {
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium: number;
};

export type IngredientSummary = {
  food_name: string;
  serving_unit: string;
  tag_name: string;
  serving_qty: number;
  common_type: null;
  tag_id: string;
  photo: {
    thumb: string;
  };
  locale: string;
};

export type IngredientShort = {
  food_name: string;
  selected_qty: number;
  selected_unit: string;
};

export type Meal = {
  title: string;
  path: string;
};
