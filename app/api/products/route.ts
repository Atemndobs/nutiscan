import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Product } from "@/lib/types/product";

export async function POST(request: Request) {
  try {
    const product: Product = await request.json();

    // Check if product already exists
    const existingProduct = await prisma.product.findUnique({
      where: { barcode: product.barcode },
    });

    // Create or update the product
    const savedProduct = await prisma.product.upsert({
      where: { barcode: product.barcode },
      update: {
        name: product.name,
        brand: product.brand,
        imageUrl: product.image_url,
        ingredients: JSON.stringify(product.ingredients),
        allergens: JSON.stringify(product.allergens),
        category: product.category,
        quantity: product.quantity,
        servingSize: product.serving_size,
        novaGroup: product.nova_group,
        nutriscoreGrade: product.nutriscore_grade,
        ecoScore: product.eco_score,
        energyKcal: product.nutrients.energy_kcal,
        carbohydrates: product.nutrients.carbohydrates,
        proteins: product.nutrients.proteins,
        fat: product.nutrients.fat,
        fiber: product.nutrients.fiber,
        sugars: product.nutrients.sugars,
        salt: product.nutrients.salt,
      },
      create: {
        barcode: product.barcode,
        name: product.name,
        brand: product.brand,
        imageUrl: product.image_url,
        ingredients: JSON.stringify(product.ingredients),
        allergens: JSON.stringify(product.allergens),
        category: product.category,
        quantity: product.quantity,
        servingSize: product.serving_size,
        novaGroup: product.nova_group,
        nutriscoreGrade: product.nutriscore_grade,
        ecoScore: product.eco_score,
        energyKcal: product.nutrients.energy_kcal,
        carbohydrates: product.nutrients.carbohydrates,
        proteins: product.nutrients.proteins,
        fat: product.nutrients.fat,
        fiber: product.nutrients.fiber,
        sugars: product.nutrients.sugars,
        salt: product.nutrients.salt,
      },
    });

    // Create a scan record
    const scan = await prisma.scan.create({
      data: {
        barcode: product.barcode,
      },
    });

    return NextResponse.json({ product: savedProduct, scan });
  } catch (error) {
    console.error("Failed to save product:", error);
    return NextResponse.json(
      { error: "Failed to save product" },
      { status: 500 }
    );
  }
}
