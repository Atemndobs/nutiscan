"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Euro, Utensils, TrendingUp } from "lucide-react";

interface Stats {
  totalItems: number;
  byCategory: Record<string, number>;
  byDate: Record<string, number>;
}

export function StatsOverview() {
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
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 glass-card animate-pulse">
            <div className="h-16 bg-muted/20 rounded" />
          </Card>
        ))}
      </div>
    );
  }

  const totalItems = stats?.totalItems || 0;
  const totalCategories = Object.keys(stats?.byCategory || {}).length;
  const avgPerDay = totalItems / 7; // Weekly average

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Items</p>
            <p className="text-2xl font-bold">{totalItems}</p>
          </div>
          <Utensils className="text-primary" />
        </div>
      </Card>
      
      <Card className="p-4 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Categories</p>
            <p className="text-2xl font-bold">{totalCategories}</p>
          </div>
          <Euro className="text-primary" />
        </div>
      </Card>
      
      <Card className="p-4 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Avg/Day</p>
            <p className="text-2xl font-bold">{avgPerDay.toFixed(1)}</p>
          </div>
          <TrendingUp className="text-primary" />
        </div>
      </Card>
    </div>
  );
}