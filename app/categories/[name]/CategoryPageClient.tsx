"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Circle as DefaultIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface Item {
  id: string;
  name: string;
  category: string;
  date: string;
  storeName: string;
  address: string;
}

interface CategoryPageClientProps {
  category: { 
    name: string; 
    icon?: any; 
    description: string 
  };
  decodedName: string;
}

export default function CategoryPageClient({ category, decodedName }: CategoryPageClientProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryItems() {
      try {
        const response = await fetch(`/api/categories/${encodeURIComponent(decodedName)}/items`);
        if (!response.ok) {
          setItems([]);
          return;
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching category items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryItems();
  }, [decodedName]);

  // Fallback to DefaultIcon if no icon is provided
  const CategoryIcon = category.icon || DefaultIcon;

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/categories">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <CategoryIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">{category.name}</h1>
        </div>
      </div>

      <p className="text-muted-foreground">{category.description}</p>

      {loading ? (
        <div className="text-center text-muted-foreground">Loading items...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-muted-foreground">No items found in this category</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-medium">{item.name}</h2>
                  <div className="text-sm text-muted-foreground">
                    {item.storeName} - {formatDate(item.date)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
