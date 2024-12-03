import { NextResponse } from "next/server";
import { getProductByBarcode } from "@/lib/services/openFoodFacts";

export async function GET(
  request: Request,
  { params }: { params: { barcode: string } }
) {
  try {
    const product = await getProductByBarcode(params.barcode);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch product" },
      { status: 404 }
    );
  }
}
