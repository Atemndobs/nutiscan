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
      
      <div className="grid grid-cols-2 gap-4">
        {displayCategories.map((category) => (
          <Link 
            key={category.name} 
            href={`/categories/${encodeURIComponent(category.name)}`}
            className="block w-full"
          >
            <div className="group h-full">
              <div className="relative h-full p-4 rounded-lg bg-card hover:bg-accent transition-colors border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${category.color} bg-opacity-10`}>
                    <category.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium truncate">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {loading ? "Loading..." : `${stats[category.name] || 0} items`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}