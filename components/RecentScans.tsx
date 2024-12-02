"use client";

import { useReceiptStore } from "@/lib/store";
import { Card } from "./ui/card";
import { formatDistanceToNow } from "date-fns";

export function RecentScans() {
  const items = useReceiptStore((state) => state.items);
  const recentItems = items.slice(0, 5);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Scans</h2>
      
      <div className="space-y-3">
        {recentItems.map((item) => (
          <Card key={item.id} className="p-4 glass-card">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{item.calories} kcal</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}