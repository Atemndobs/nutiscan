import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { categories } from "@/lib/categories";
import { Product } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string | null;
  products: Product[];
}

interface CategoryStats {
  totalItems: number;
  totalSpent: number;
  averagePrice: number;
  mostExpensiveItem: Product | null;
  leastExpensiveItem: Product | null;
  recentItems: Product[];
}

export function CategoryStatsModal({ isOpen, onClose, categoryName, products }: CategoryStatsModalProps) {
  if (!categoryName) return null;

  const category = categories.find(c => c.name === categoryName);
  if (!category) return null;

  const Icon = category.icon;

  const calculateStats = (products: Product[]): CategoryStats => {
    const categoryProducts = products.filter(p => p.category === categoryName);
    const validPrices = categoryProducts.filter(p => p.price !== null).map(p => p.price!);

    const totalItems = categoryProducts.length;
    const totalSpent = validPrices.reduce((sum, price) => sum + price, 0);
    const averagePrice = totalSpent / validPrices.length;

    const sortedByPrice = [...categoryProducts].sort((a, b) => 
      ((b.price || 0) - (a.price || 0))
    );

    return {
      totalItems,
      totalSpent,
      averagePrice,
      mostExpensiveItem: sortedByPrice[0] || null,
      leastExpensiveItem: sortedByPrice[sortedByPrice.length - 1] || null,
      recentItems: categoryProducts.slice(0, 5) // Last 5 items
    };
  };

  const stats = calculateStats(products);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${category.color}`} />
            <span>{category.name} Statistics</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Overview</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Total Items: <span className="font-medium text-foreground">{stats.totalItems}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Total Spent: <span className="font-medium text-foreground">${stats.totalSpent.toFixed(2)}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Average Price: <span className="font-medium text-foreground">${stats.averagePrice.toFixed(2)}</span>
              </p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Price Range</h3>
            <div className="space-y-2">
              {stats.mostExpensiveItem && (
                <p className="text-sm text-muted-foreground">
                  Most Expensive: <span className="font-medium text-foreground">
                    {stats.mostExpensiveItem.name} (${stats.mostExpensiveItem.price?.toFixed(2)})
                  </span>
                </p>
              )}
              {stats.leastExpensiveItem && (
                <p className="text-sm text-muted-foreground">
                  Least Expensive: <span className="font-medium text-foreground">
                    {stats.leastExpensiveItem.name} (${stats.leastExpensiveItem.price?.toFixed(2)})
                  </span>
                </p>
              )}
            </div>
          </Card>

          <Card className="p-4 col-span-2">
            <h3 className="text-sm font-medium mb-2">Recent Items</h3>
            <div className="space-y-2">
              {stats.recentItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">${item.price?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
