"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/categories";

interface Stats {
  totalItems: number;
  byCategory: Record<string, number>;
}

export function CategoryBreakdown() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card className="p-4 glass-card">
        <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted/20 rounded w-3/4 mb-2" />
              <div className="h-2 bg-muted/20 rounded w-1/2" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // Sort categories by count and filter out ones with 0 items
  const sortedCategories = categories
    .map(category => ({
      ...category,
      count: stats?.byCategory[category.name] || 0
    }))
    .filter(category => category.count > 0)
    .sort((a, b) => b.count - a.count);

  const totalItems = stats?.totalItems || 0;

  if (sortedCategories.length === 0) {
    return (
      <Card className="p-4 glass-card">
        <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
        <p className="text-muted-foreground text-sm">No items tracked yet.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 glass-card">
      <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
      <div className="space-y-4">
        {sortedCategories.map((category) => {
          const percentage = totalItems > 0 
            ? (category.count / totalItems) * 100 
            : 0;

          return (
            <div key={category.name}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <category.icon className={`w-4 h-4 ${category.color}`} />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {category.count} items ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}