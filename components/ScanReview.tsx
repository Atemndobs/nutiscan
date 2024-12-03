import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Save, X, ShoppingBasket, Tags, Euro, Settings } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from '@/lib/categories';
import { ScannedItem } from '@/lib/scanner';

interface ScanReviewProps {
  data: {
    items: ScannedItem[];
    receiptDate?: string;
    storeName: string;
    storeAddress: string;
  };
  onSave: (data: { 
    items: ScannedItem[]; 
    receiptDate?: string;
    storeName: string;
    storeAddress: string;
  }) => void;
  onCancel: () => void;
}

export function ScanReview({ data, onSave, onCancel }: ScanReviewProps) {
  const [items, setItems] = useState<ScannedItem[]>(data.items);
  const [receiptDate, setReceiptDate] = useState<string>(
    data.receiptDate || new Date().toISOString().split('T')[0]
  );
  const [storeName, setStoreName] = useState(data.storeName);
  const [storeAddress, setStoreAddress] = useState(data.storeAddress);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    onSave({ items, receiptDate, storeName, storeAddress });
  };

  const handleUpdateItem = (id: string, field: keyof ScannedItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: field === 'price' ? Number(value) : value } : item
    ));
  };

  const handleEditComplete = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-6 max-h-[calc(100vh-6rem)] flex flex-col -mx-8">
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium min-w-[100px]">Store Name:</span>
          <Input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Enter store name"
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium min-w-[100px]">Address:</span>
          <Input
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
            placeholder="Enter store address"
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium min-w-[100px]">Date:</span>
          <Input
            type="date"
            value={receiptDate}
            onChange={(e) => setReceiptDate(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      <div className="border-x-0 border-y flex-1 overflow-auto">
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[30%]">
                <ShoppingBasket className="w-4 h-4" aria-label="Item" />
              </TableHead>
              <TableHead className="w-[30%]">
                <Tags className="w-4 h-4" aria-label="Category" />
              </TableHead>
              <TableHead className="w-[25%] text-right">
                <Euro className="w-4 h-4 ml-auto" aria-label="Price" />
              </TableHead>
              <TableHead className="w-[15%]">
                <Settings className="w-4 h-4 ml-auto" aria-label="Actions" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium max-w-[160px]">
                  {editingId === item.id ? (
                    <Input
                      value={item.name}
                      onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <span className="truncate block w-full">{item.name}</span>
                  )}
                </TableCell>
                <TableCell className="px-0">
                  {editingId === item.id ? (
                    <Select
                      value={item.category || ''}
                      onValueChange={(value) => handleUpdateItem(item.id, 'category', value)}
                    >
                      <SelectTrigger className="w-full px-0">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent align="start">
                        {categories.map((category) => (
                          <SelectItem 
                            key={category.name} 
                            value={category.name}
                            className={category.color}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className={`truncate block ${categories.find(c => c.name === item.category)?.color}`}>
                      {item.category || '??'}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === item.id ? (
                    <Input
                      type="number"
                      value={item.price || ''}
                      onChange={(e) => handleUpdateItem(item.id, 'price', e.target.value)}
                      className="w-full text-right"
                    />
                  ) : (
                    item.price ? `${item.price.toFixed(2)}` : '-'
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {editingId === item.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingId(null)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="h-20" /> {/* Spacer to prevent overlap */}
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-end gap-2 bg-background p-4 border-t z-20">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Items</Button>
      </div>
    </div>
  );
}
