"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Store, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { categories } from "@/lib/categories";
import { Product, Scan } from "@/lib/types";
import { startOfWeek, startOfMonth, startOfYear, isAfter } from "date-fns";

interface HistoryListProps {
  searchQuery: string;
  timeRange: string;
}

export function HistoryList({ searchQuery, timeRange }: HistoryListProps) {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedScanId, setExpandedScanId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const response = await fetch('/api/scans/all');
      const data = await response.json();
      setScans(data);
    } catch (error) {
      console.error('Error fetching scans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScanClick = (scanId: string) => {
    setExpandedScanId(expandedScanId === scanId ? null : scanId);
  };

  const handleCategoryClick = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
  };

  const getCategoryIcon = (categoryName: string | null) => {
    if (!categoryName) {
      return (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            handleCategoryClick(categoryName);
          }}
        >
          <span className="text-muted-foreground">❓</span>
          <span className="text-sm text-muted-foreground">Uncategorized</span>
        </div>
      );
    }
    const category = categories.find(c => c.name === categoryName);
    if (!category) return null;
    
    const Icon = category.icon;
    return (
      <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        onClick={(e) => {
          e.stopPropagation();
          handleCategoryClick(categoryName);
        }}
      >
        <Icon className={`h-4 w-4 ${category.color}`} />
        <span className="text-sm">{category.name}</span>
      </div>
    );
  };

  const filteredScans = scans.filter(scan => {
    // Time range filter
    const scanDate = new Date(scan.createdAt);
    const now = new Date();
    
    let passesTimeFilter = true;
    switch (timeRange) {
      case 'week':
        passesTimeFilter = isAfter(scanDate, startOfWeek(now));
        break;
      case 'month':
        passesTimeFilter = isAfter(scanDate, startOfMonth(now));
        break;
      case 'year':
        passesTimeFilter = isAfter(scanDate, startOfYear(now));
        break;
    }
    
    if (!passesTimeFilter) return false;
    
    // Search query filter
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    // Search in product name and category
    const product = scan.product;
    if (!product) return false;
    
    if (product.name.toLowerCase().includes(query)) return true;
    if (product.category?.toLowerCase().includes(query)) return true;
    
    return false;
  });

  if (loading) {
    return <div>Loading scan history...</div>;
  }

  if (filteredScans.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {scans.length === 0 ? 'No scans found' : 'No matching scans found'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredScans.map((scan) => (
        <Card key={scan.id} className="p-4">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleScanClick(scan.id)}
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                <span className="font-medium">{scan.product?.name || 'Unknown Product'}</span>
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

          {expandedScanId === scan.id && (
            <div className="mt-4 border-t pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Details</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{scan.product?.name || 'Unknown Product'}</TableCell>
                    <TableCell>
                      {getCategoryIcon(scan.product?.category)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}