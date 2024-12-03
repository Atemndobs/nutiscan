import { 
  Apple, 
  Coffee, 
  Beef, 
  Milk, 
  Carrot, 
  Croissant, 
  Droplet,
  Cookie,
  Fish,
  Sandwich,
  IceCream,
  Wine,
  Soup,
  Wheat,
  Snail
} from "lucide-react";

export const categories = [
  // Fresh Products
  { name: "Fruits", icon: Apple, color: "text-green-500", description: "Fresh fruits and dried fruits" },
  { name: "Veges", icon: Carrot, color: "text-orange-700", description: "Fresh and frozen vegetables" },
  { name: "Meat", icon: Beef, color: "text-red-500", description: "Beef, pork, poultry, and other meats" },
  { name: "Seafood", icon: Fish, color: "text-blue-700", description: "Fish, shellfish, and seafood products" },
  { name: "Dairy", icon: Milk, color: "text-blue-500", description: "Milk, cheese, yogurt, and eggs" },
  
  // Bakery & Grains
  { name: "Bakery", icon: Croissant, color: "text-yellow-700", description: "Fresh bread, pastries, and baked goods" },
  { name: "Cereals", icon: Wheat, color: "text-yellow-600", description: "Rice, pasta, oats, and cereals" },
  
  // Pantry Items
  { name: "Oils", icon: Droplet, color: "text-yellow-500", description: "Cooking oils, vinegar, and fats" },
  { name: "Spices", icon: Soup, color: "text-gray-500", description: "Sauces, spices, and seasonings" },
  // { name: "Canned & Preserved", icon: Soup, color: "text-orange-600", description: "Canned vegetables, soups, and preserved foods" },
  
  // Snacks & Sweets
  { name: "Snacks", icon: Sandwich, color: "text-orange-500", description: "Chips, crackers, nuts, and savory snacks" },
  { name: "Sweets", icon: Cookie, color: "text-pink-500", description: "Candy, chocolate, and sweet treats" },
  
  // Beverages
  { name: "Drinks", icon: Coffee, color: "text-brown-700", description: "Coffee, tea, and hot chocolate" },
  // { name: "Cold Drinks", icon: Wine, color: "text-purple-500", description: "Soft drinks, juices, and alcoholic beverages" },
  
  // Frozen
  { name: "Frozen", icon: IceCream, color: "text-cyan-500", description: "Frozen meals, desserts, and ice cream" },
  
  // Specialty
  // { name: "Specialty Foods", icon: Snail, color: "text-indigo-500", description: "Organic, gluten-free, and specialty items" }
] as const;

export type CategoryName = typeof categories[number]['name'];
