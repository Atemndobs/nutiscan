"use client";

import { useReceiptStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, ShoppingBasket, Tags, DollarSign, Trash2 } from "lucide-react";
import { categories } from '@/lib/categories';

export function HistoryList() {
  const { items, removeItem } = useReceiptStore();

  const getCategoryIcon = (categoryName: string | undefined) => {
    const category = categories.find(c => c.name === categoryName);
    if (!category) return null;
    const Icon = category.icon;
    return <Icon className={`w-4 h-4 ${category.color}`} />;
  };

  return (
    <Card className="glass-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15%]">
              <Calendar className="w-4 h-4" aria-label="Date" />
            </TableHead>
            <TableHead className="w-[25%]">
              <ShoppingBasket className="w-4 h-4" aria-label="Item" />
            </TableHead>
            <TableHead className="w-[30%]">
              <Tags className="w-4 h-4" aria-label="Category" />
            </TableHead>
            <TableHead className="w-[20%] text-right">
              <DollarSign className="w-4 h-4 ml-auto" aria-label="Price" />
            </TableHead>
            <TableHead className="w-[10%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-muted-foreground">
                {format(new Date(item.date), 'dd/MM')}
              </TableCell>
              <TableCell>
                <span className="truncate block max-w-[80px]">{item.name}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(item.category)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                €{(item.price || 0).toFixed(2)}
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
    </Card>
  );
}