"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight, MapPin, Calendar, ShoppingBag, ChevronDown, ChevronUp, Tag, Euro } from "lucide-react";
import { categories } from "@/lib/categories";
import Link from "next/link";
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  category: string | null;
  price: number | null;
}

interface Scan {
  id: string;
  storeName: string;
  address: string;
  createdAt: string;
  products?: Product[];
}

export function RecentScans() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedScanId, setExpandedScanId] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentScans();
  }, []);

  const fetchRecentScans = async () => {
    try {
      const response = await fetch('/api/scans/recent');
      const data = await response.json();
      setScans(data);
    } catch (error) {
      console.error('Error fetching recent scans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScanClick = async (scanId: string) => {
    if (expandedScanId === scanId) {
      setExpandedScanId(null);
      return;
    }

    try {
      const response = await fetch(`/api/scans/${scanId}`);
      const data = await response.json();
      setScans(scans.map(scan => 
        scan.id === scanId ? { ...scan, products: data.products } : scan
      ));
      setExpandedScanId(scanId);
    } catch (error) {
      console.error('Error fetching scan details:', error);
    }
  };

  const getCategoryIcon = (category: string | null) => {
    const categoryData = categories.find(cat => cat.name === category);
    const CategoryIcon = categoryData ? categoryData.icon : Tag;
    const iconColor = categoryData ? categoryData.color : 'text-gray-500';
    return { CategoryIcon, iconColor };
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Scans</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-secondary/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Scans</h2>
        <Link href="/history">
          <Button variant="ghost" className="text-sm text-muted-foreground">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {scans.map((scan) => (
          <Card
            key={scan.id}
            className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <div 
              className="flex items-center justify-between"
              onClick={() => handleScanClick(scan.id)}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-medium">{scan.storeName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{scan.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(scan.createdAt)}</span>
                </div>
              </div>
              {expandedScanId === scan.id ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            {expandedScanId === scan.id && scan.products && (
              <div className="mt-4 border-t pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scan.products.map((product) => {
                      const { CategoryIcon, iconColor } = getCategoryIcon(product.category);
                      return (
                        <TableRow key={product.id}>
                          <TableCell className="w-full max-w-[120px] line-clamp-2 overflow-hidden text-ellipsis">{product.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CategoryIcon className={`h-4 w-4 ${iconColor}`} />
                              {product.category || '??'}
                            </div>
                          </TableCell>
                          <TableCell className="text-right flex items-center justify-end gap-1">
                            <Euro className="h-4 w-4 text-green-500" />
                            {product.price ? `${product.price.toFixed(2)}` : '-'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}