export interface ProductNutrients {
  carbohydrates: number;
  proteins: number;
  fat: number;
  fiber: number;
  sugars: number;
  salt: number;
  energy_kcal: number;
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  image_url: string;
  ingredients: string[];
  allergens: string[];
  nutrients: ProductNutrients;
  category: string;
  quantity: string;
  serving_size: string;
  nova_group?: number;
  nutriscore_grade?: string;
  eco_score?: string;
}
