"use client";

import { Apple, Coffee, Beef, Milk, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const categories = [
  { name: "Fruits", icon: Apple, color: "text-green-500" },
  { name: "Drinks", icon: Coffee, color: "text-orange-500" },
  { name: "Meat", icon: Beef, color: "text-red-500" },
  { name: "Dairy", icon: Milk, color: "text-blue-500" },
];

export function CategoryGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Categories</h2>
        <Button variant="ghost" className="text-sm text-muted-foreground">
          See all <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="secondary"
            className="flex flex-col items-center gap-2 h-auto py-4 glass-card"
          >
            <category.icon className={`w-6 h-6 ${category.color}`} />
            <span className="text-xs">{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}