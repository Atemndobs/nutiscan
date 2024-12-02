"use client";

import { useState } from "react";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { scanReceipt, parseReceiptText } from "@/lib/scanner";
import { useReceiptStore } from "@/lib/store";
import { v4 as uuidv4 } from 'uuid';

export function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const addItem = useReceiptStore((state) => state.addItem);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setScanning(true);
      setPreview(URL.createObjectURL(file));

      const text = await scanReceipt(file);
      const items = parseReceiptText(text);

      if (items.length === 0) {
        throw new Error("No items found in receipt. Please try again with a clearer image.");
      }

      items.forEach((item) => {
        addItem({
          id: uuidv4(),
          name: item.name,
          calories: 0,
          category: "Uncategorized",
          date: new Date().toISOString(),
          price: parseFloat(item.price.replace(',', '.'))
        });
      });
    } catch (error) {
      console.error("Error processing receipt:", error);
      setError(error instanceof Error ? error.message : "Failed to process receipt. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        {preview ? (
          <img src={preview} alt="Receipt preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button disabled={scanning}>
          <label className="cursor-pointer flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Camera className="w-4 h-4" />
            {scanning ? "Processing..." : "Take Photo"}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
              disabled={scanning}
            />
          </label>
        </Button>

        <Button disabled={scanning} variant="outline">
          <label className="cursor-pointer flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Upload className="w-4 h-4" />
            {scanning ? "Processing..." : "Upload"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={scanning}
            />
          </label>
        </Button>
      </div>

      {error && (
        <div className="text-sm text-red-500 text-center">
          {error}
        </div>
      )}

      {scanning && (
        <div className="text-sm text-center">
          <p>Scanning receipt...</p>
        </div>
      )}
    </div>
  );
}