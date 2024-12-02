import { Apple, Coffee, Beef, Milk } from "lucide-react";

export const categories = [
  { name: "Fruits", icon: Apple, color: "text-green-500" },
  { name: "Drinks", icon: Coffee, color: "text-orange-500" },
  { name: "Meat", icon: Beef, color: "text-red-500" },
  { name: "Dairy", icon: Milk, color: "text-blue-500" },
] as const;

export type CategoryName = typeof categories[number]['name'];
