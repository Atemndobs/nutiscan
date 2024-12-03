"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { categories } from "@/lib/categories";
import { useEffect, useState } from "react";
import type { CategoryName } from "@/lib/categories";
import Link from "next/link";

interface CategoryGridProps {
  showAll?: boolean;
}

export function CategoryGrid({ showAll = false }: CategoryGridProps) {
  const [stats, setStats] = useState<Record<CategoryName, number>>({} as Record<CategoryName, number>);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/categories/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching category stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Sort categories by item count and take top 4 if not showing all
  const sortedCategories = [...categories].sort((a, b) => 
    (stats[b.name] || 0) - (stats[a.name] || 0)
  );
  
  const displayCategories = showAll ? sortedCategories : sortedCategories.slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Categories</h2>
        {!showAll && (
          <Link href="/categories">
            <Button variant="ghost" className="text-sm text-muted-foreground">
              See all <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {displayCategories.map((category) => (
          <Button
            key={category.name}
            variant="secondary"
            className="flex flex-col items-center gap-2 h-auto py-4 glass-card relative group hover:bg-secondary/80"
          >
            <category.icon 
              className={`w-6 h-6 ${category.color} transition-colors group-hover:scale-110`} 
              strokeWidth={2} 
            />
            <span className="text-sm font-medium">{category.name}</span>
            <span className="text-xs text-muted-foreground">
              {loading ? '...' : `${stats[category.name] || 0} items`}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}