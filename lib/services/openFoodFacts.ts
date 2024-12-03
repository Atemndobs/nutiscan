import { Product, ProductNutrients } from "../types/product";

const API_URL = "https://world.openfoodfacts.org/api/v2";

interface OpenFoodFactsProduct {
  code: string;
  product: {
    product_name: string;
    brands: string;
    image_url: string;
    ingredients_text: string;
    allergens_tags: string[];
    categories_tags: string[];
    quantity: string;
    serving_size: string;
    nutriments: {
      carbohydrates_100g: number;
      proteins_100g: number;
      fat_100g: number;
      fiber_100g: number;
      sugars_100g: number;
      salt_100g: number;
      energy-kcal_100g: number;
    };
    nova_group?: number;
    nutriscore_grade?: string;
    ecoscore_grade?: string;
  };
  status: number;
  status_verbose: string;
}

export async function getProductByBarcode(barcode: string): Promise<Product> {
  const response = await fetch(
    `${API_URL}/product/${barcode}?fields=code,product_name,brands,image_url,ingredients_text,allergens_tags,categories_tags,quantity,serving_size,nutriments,nova_group,nutriscore_grade,ecoscore_grade`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  const data: OpenFoodFactsProduct = await response.json();

  if (data.status !== 1) {
    throw new Error(data.status_verbose || "Failed to fetch product");
  }

  const nutrients: ProductNutrients = {
    carbohydrates: data.product.nutriments.carbohydrates_100g || 0,
    proteins: data.product.nutriments.proteins_100g || 0,
    fat: data.product.nutriments.fat_100g || 0,
    fiber: data.product.nutriments.fiber_100g || 0,
    sugars: data.product.nutriments.sugars_100g || 0,
    salt: data.product.nutriments.salt_100g || 0,
    energy_kcal: data.product.nutriments["energy-kcal_100g"] || 0,
  };

  const ingredients = data.product.ingredients_text
    ? data.product.ingredients_text.split(",").map(i => i.trim())
    : [];

  const allergens = data.product.allergens_tags
    .map(tag => tag.replace("en:", ""))
    .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1));

  const mainCategory = data.product.categories_tags?.[0]?.replace("en:", "") || "Unknown";

  return {
    id: data.code,
    barcode: data.code,
    name: data.product.product_name || "Unknown Product",
    brand: data.product.brands || "Unknown Brand",
    image_url: data.product.image_url || "",
    ingredients,
    allergens,
    nutrients,
    category: mainCategory,
    quantity: data.product.quantity || "",
    serving_size: data.product.serving_size || "",
    nova_group: data.product.nova_group,
    nutriscore_grade: data.product.nutriscore_grade,
    eco_score: data.product.ecoscore_grade,
  };
}
