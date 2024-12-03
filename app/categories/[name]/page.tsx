"use client";

import { useEffect, useState } from "react";
import { categories } from "@/lib/categories";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
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

export default function CategoryPage({ params }: { params: { name: string } }) {
  const decodedName = decodeURIComponent(params.name);
  const category = categories.find(c => c.name === decodedName);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryItems() {
      try {
        const response = await fetch(`/api/categories/${encodeURIComponent(decodedName)}/items`);
        if (!response.ok) throw new Error('Failed to fetch items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching category items:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryItems();
  }, [decodedName]);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{category.name}</h1>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <Card className="p-4">
            <p className="text-muted-foreground">Loading items...</p>
          </Card>
        ) : items.length === 0 ? (
          <Card className="p-4">
            <p className="text-muted-foreground">No items in this category yet.</p>
          </Card>
        ) : (
          items.map(item => (
            <Card key={item.id} className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(item.date)}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{item.storeName}</p>
                  <p>{item.address}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
