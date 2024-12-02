"use client";

import { Card } from "@/components/ui/card";
import { useReceiptStore } from "@/lib/store";
import { subDays, format } from "date-fns";

export function CaloriesChart() {
  const items = useReceiptStore((state) => state.items);
  
  // Get the last 7 days of data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dayItems = items.filter(item => 
      format(new Date(item.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    const calories = dayItems.reduce((sum, item) => sum + item.calories, 0);
    
    return {
      date,
      calories,
    };
  }).reverse();

  // Find the maximum calories for scaling
  const maxCalories = Math.max(...last7Days.map(day => day.calories));
  
  return (
    <Card className="p-4 glass-card">
      <h2 className="text-lg font-semibold mb-4">Weekly Calories</h2>
      <div className="flex items-end gap-2 h-[150px]">
        {last7Days.map((day) => (
          <div
            key={format(day.date, 'yyyy-MM-dd')}
            className="flex-1 flex flex-col items-center gap-2"
          >
            <div className="w-full flex-1 flex items-end">
              <div
                className="w-full bg-primary/20 rounded-t-md relative group"
                style={{
                  height: `${(day.calories / maxCalories) * 100}%`,
                  minHeight: '4px'
                }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary/20 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.calories} kcal
                </div>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {format(day.date, 'EEE')}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}