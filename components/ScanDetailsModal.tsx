import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from '@/lib/utils';
import { MapPin, Store } from 'lucide-react';
import { Scan } from '@/lib/db';

interface Product {
  id: string;
  name: string;
  category: string | null;
  price: number | null;
}

interface ScanDetailsModalProps {
  scan: Scan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScanDetailsModal({ scan, open, onOpenChange }: ScanDetailsModalProps) {
  if (!scan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                <span>{scan.storeName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{scan.address}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDate(scan.createdAt)}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scan.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="w-full max-w-[120px] line-clamp-2 overflow-hidden text-ellipsis">{product.name}</TableCell>
                <TableCell>{product.category || '??'}</TableCell>
                <TableCell className="text-right">
                  {product.price ? `$${product.price.toFixed(2)}` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
