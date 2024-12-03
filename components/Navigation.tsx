"use client";

import { Home, BarChart2, History, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ScanButton } from "@/components/scanner/ScanButton";
import { useState } from "react";
import { Product } from "@/lib/types/product";
import { ProductDetails } from "@/components/products/ProductDetails";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Stats", icon: BarChart2, href: "/stats" },
  { name: "History", icon: History, href: "/history" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleScan = async (barcode: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${barcode}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch product"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (product: Product) => {
    try {
      setSaving(true);
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      toast.success("Product saved successfully!");
      setProduct(null);
      router.refresh(); // Refresh the page to update stats
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-20 right-4 z-50">
        <ScanButton onScan={handleScan} />
      </div>
      
      <Dialog open={!!product} onOpenChange={() => !saving && setProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {product && (
            <ProductDetails
              product={product}
              onSave={handleSave}
              onClose={() => !saving && setProduct(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-lg">
        <div className="container max-w-md mx-auto">
          <div className="flex justify-around py-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-item ${pathname === item.href ? "active" : ""}`}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}