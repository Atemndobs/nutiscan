"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScannerModal } from "./ScannerModal";
import { Scan } from "lucide-react";

interface ScanButtonProps {
  onScan: (barcode: string) => void;
}

export function ScanButton({ onScan }: ScanButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="gap-2"
      >
        <Scan className="h-4 w-4" />
        Scan Product
      </Button>

      <ScannerModal
        open={open}
        onOpenChange={setOpen}
        onScan={onScan}
      />
    </>
  );
}
