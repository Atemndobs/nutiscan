"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { BarcodeScanner } from "./BarcodeScanner";

interface ScannerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScan: (barcode: string) => void;
}

export function ScannerModal({ open, onOpenChange, onScan }: ScannerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md"
        description="Scan a product barcode using your device's camera"
      >
        <DialogHeader>
          <DialogTitle>Scan Product Barcode</DialogTitle>
          <DialogPrimitive.Description>
            Use your device's camera to scan a product barcode.
          </DialogPrimitive.Description>
        </DialogHeader>
        <BarcodeScanner
          onResult={(code) => {
            onScan(code);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
