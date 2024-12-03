import { Apple, Coffee, Beef, Milk, Carrot, Croissant, Droplet } from "lucide-react";

export const categories = [
  { name: "Fruits", icon: Apple, color: "text-green-500" },
  { name: "Vegetables", icon: Carrot, color: "text-orange-700" },
  { name: "Drinks", icon: Coffee, color: "text-orange-500" },
  { name: "Meat", icon: Beef, color: "text-red-500" },
  { name: "Dairy", icon: Milk, color: "text-blue-500" },
  { name: "Bread & Bakery", icon: Croissant, color: "text-yellow-700" },
  { name: "Oils", icon: Droplet, color: "text-yellow-500" },
] as const;

export type CategoryName = typeof categories[number]['name'];
