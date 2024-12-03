"use client";

import { Product } from "@/lib/types/product";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  AlertTriangle,
  Leaf,
  Scale,
  Star,
  Tag,
  ThumbsUp,
} from "lucide-react";

interface ProductDetailsProps {
  product: Product;
  onSave?: (product: Product) => void;
  onClose?: () => void;
}

export function ProductDetails({
  product,
  onSave,
  onClose,
}: ProductDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        {product.image_url && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <div className="flex gap-2 mt-2">
            {product.nutriscore_grade && (
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-4 h-4" />
                Nutri-Score: {product.nutriscore_grade.toUpperCase()}
              </div>
            )}
            {product.eco_score && (
              <div className="flex items-center gap-1 text-xs">
                <Leaf className="w-4 h-4" />
                Eco-Score: {product.eco_score.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="font-medium mb-2">Nutrition Facts</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Energy</div>
          <div className="text-right">{product.nutrients.energy_kcal} kcal</div>
          <div>Carbohydrates</div>
          <div className="text-right">{product.nutrients.carbohydrates}g</div>
          <div>Proteins</div>
          <div className="text-right">{product.nutrients.proteins}g</div>
          <div>Fat</div>
          <div className="text-right">{product.nutrients.fat}g</div>
          <div>Fiber</div>
          <div className="text-right">{product.nutrients.fiber}g</div>
          <div>Sugars</div>
          <div className="text-right">{product.nutrients.sugars}g</div>
          <div>Salt</div>
          <div className="text-right">{product.nutrients.salt}g</div>
        </div>
      </Card>

      {product.allergens.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 text-warning mb-2">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="font-medium">Allergens</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.allergens.map((allergen) => (
              <div
                key={allergen}
                className="px-2 py-1 bg-warning/10 text-warning-foreground rounded text-xs"
              >
                {allergen}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4" />
          <h3 className="font-medium">Details</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category</span>
            <span>{product.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantity</span>
            <span>{product.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Serving Size</span>
            <span>{product.serving_size}</span>
          </div>
        </div>
      </Card>

      {product.ingredients.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4" />
            <h3 className="font-medium">Ingredients</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {product.ingredients.join(", ")}
          </p>
        </Card>
      )}

      <div className="flex gap-2">
        {onSave && (
          <Button
            className="flex-1"
            onClick={() => onSave(product)}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Save Product
          </Button>
        )}
        {onClose && (
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
}
