"use client";

import { useReceiptStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Stats() {
  const items = useReceiptStore((state) => state.items);

  const categoryData = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
  const averageCalories = items.length ? Math.round(totalCalories / items.length) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calories Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Total Items:</span> {items.length}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Total Calories:</span> {totalCalories}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Average Calories per Item:</span> {averageCalories}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(categoryData).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="font-medium">{category}</span>
                <span className="bg-primary/10 px-2 py-1 rounded-full text-sm">
                  {count} items
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}