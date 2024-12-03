"use client";

import { useReceiptStore } from "@/lib/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBasket, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { categories } from "@/lib/categories";

export function ItemsList() {
  const { items, removeItem } = useReceiptStore();

  const getCategoryIcon = (categoryName: string | undefined) => {
    const category = categories.find(c => c.name === categoryName);
    if (!category) return null;
    const Icon = category.icon;
    return <Icon className={`w-4 h-4 ${category.color}`} />;
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No items added yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent Items</h2>
        <span className="text-sm text-muted-foreground">
          {items.length} items
        </span>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Calendar className="w-4 h-4" aria-label="Date" />
              </TableHead>
              <TableHead>
                <ShoppingBasket className="w-4 h-4" aria-label="Item" />
              </TableHead>
              <TableHead className="text-right">
                <DollarSign className="w-4 h-4 ml-auto" aria-label="Price" />
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-muted-foreground">
                  {format(new Date(item.date), 'dd/MM')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category)}
                    <span className="truncate">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  ${(item.price || 0).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}