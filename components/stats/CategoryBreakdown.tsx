"use client";

import { Card } from "@/components/ui/card";
import { useReceiptStore } from "@/lib/store";

export function CategoryBreakdown() {
  const items = useReceiptStore((state) => state.items);
  
  const categoryData = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { calories: 0, spent: 0 };
    }
    acc[item.category].calories += item.calories;
    acc[item.category].spent += item.price;
    return acc;
  }, {} as Record<string, { calories: number; spent: number }>);

  return (
    <Card className="p-4 glass-card">
      <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
      <div className="space-y-4">
        {Object.entries(categoryData).map(([category, data]) => (
          <div key={category}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-muted-foreground">{category}</span>
              <span className="font-medium">€{data.spent.toFixed(2)}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${(data.spent / Object.values(categoryData).reduce((sum, cat) => sum + cat.spent, 0)) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}