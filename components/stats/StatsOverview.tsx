"use client";

import { Card } from "@/components/ui/card";
import { useReceiptStore } from "@/lib/store";
import { Euro, Utensils, TrendingUp } from "lucide-react";

export function StatsOverview() {
  const items = useReceiptStore((state) => state.items);
  
  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
  const totalSpent = items.reduce((sum, item) => sum + item.price, 0);
  const avgPerDay = totalSpent / 7; // Weekly average
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold">€{totalSpent.toFixed(2)}</p>
          </div>
          <Euro className="text-primary" />
        </div>
      </Card>
      
      <Card className="p-4 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Calories</p>
            <p className="text-2xl font-bold">{totalCalories}</p>
          </div>
          <Utensils className="text-primary" />
        </div>
      </Card>
      
      <Card className="p-4 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Avg/Day</p>
            <p className="text-2xl font-bold">€{avgPerDay.toFixed(2)}</p>
          </div>
          <TrendingUp className="text-primary" />
        </div>
      </Card>
    </div>
  );
}