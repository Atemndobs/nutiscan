import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { ScanReview } from './ScanReview';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { scanReceipt, parseReceiptText, ScannedItem } from "@/lib/scanner";
import { useReceiptStore } from "@/lib/store";
import { v4 as uuidv4 } from 'uuid';
import { db, Scan, Product } from '@/lib/db'; // Corrected import for Dexie

type ScannerState = 'camera' | 'processing' | 'review';

interface ScanData {
  items: ScannedItem[];
  receiptDate?: string;
  storeName: string;
  storeAddress: string;
}

export function Scanner() {
  const [state, setState] = useState<ScannerState>('camera');
  const [scanData, setScanData] = useState<ScanData>({ 
    items: [], 
    receiptDate: undefined,
    storeName: '',
    storeAddress: ''
  });
  const addItem = useReceiptStore((state) => state.addItem);

  // Test log on component mount
  React.useEffect(() => {
    console.log('Scanner: Component mounted', {
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }, []);

  const resizeImage = async (imageData: string, maxWidth = 1024): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageData;
    });
  };

  const handleCapture = async (imageData: string) => {
    setState('processing');
    try {
      console.log('Scanner: Starting image processing', {
        originalSize: imageData.length,
        isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      });

      // Resize image if it's too large
      let processedImage = imageData;
      if (imageData.length > 800000) { // ~800KB
        console.log('Scanner: Resizing large image');
        processedImage = await resizeImage(imageData);
        console.log('Scanner: Image resized', {
          newSize: processedImage.length
        });
      }

      const text = await scanReceipt(processedImage);
      console.log('Scanner: OCR completed', {
        textLength: text.length,
        textSample: text.substring(0, 200)
      });

      const result = parseReceiptText(text);
      console.log('Scanner: Parsing completed', {
        itemsFound: result.length,
        items: result
      });

      if (result.length === 0) {
        console.warn('Scanner: No items found in receipt');
        // You might want to show a message to the user here
      }

      // Add unique IDs to items
      const itemsWithIds = result.map(item => ({
        ...item,
        id: uuidv4()
      }));

      setScanData({
        items: itemsWithIds,
        receiptDate: new Date().toISOString().split('T')[0],
        storeName: '',
        storeAddress: ''
      });
      setState('review');
    } catch (error) {
      console.error("Scanner: Error processing receipt:", error);
      setState('camera');
    }
  };

  const handleSaveItems = async () => {
    if (!scanData.items.length) return;

    try {
      const newScan: Scan = {
        storeName: scanData.storeName || 'Unknown Store',
        address: scanData.storeAddress || '',
        products: scanData.items.map(item => ({
          name: item.name,
          category: item.category || '??',
          price: parseFloat(item.price) || 0
        }))
      };

      // Save scan and products to Dexie
      await db.addScanWithProducts(newScan);

      // Reset state
      setScanData({ 
        items: [], 
        receiptDate: undefined, 
        storeName: '', 
        storeAddress: '' 
      });
      setState('camera');
    } catch (error) {
      console.error('Error saving scan:', error);
    }
  };

  const handleCancel = () => {
    setState('camera');
    setScanData({ items: [], receiptDate: undefined, storeName: '', storeAddress: '' });
  };

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {state === 'camera' && (
        <div className="w-full aspect-[3/4] bg-muted rounded-lg overflow-hidden border border-border">
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <Camera className="w-12 h-12 text-gray-400" />
            <div className="flex gap-2">
              {isMobileDevice() ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const input = document.querySelector('#camera-input') as HTMLInputElement;
                      input?.click();
                    }}
                  >
                    Take Photo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const input = document.querySelector('#file-input') as HTMLInputElement;
                      input?.click();
                    }}
                  >
                    Upload
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    const input = document.querySelector('#file-input') as HTMLInputElement;
                    input?.click();
                  }}
                >
                  Upload Receipt
                </Button>
              )}
            </div>
          </div>
          <Input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log('Camera capture initiated', { fileName: file.name, fileSize: file.size });
                const reader = new FileReader();
                reader.onload = (event) => {
                  const imageData = event.target?.result as string;
                  handleCapture(imageData);
                };
                reader.onerror = (error) => {
                  console.error('Error reading file:', error);
                  setState('camera');
                };
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
            id="camera-input"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log('File upload initiated', { fileName: file.name, fileSize: file.size });
                const reader = new FileReader();
                reader.onload = (event) => {
                  const imageData = event.target?.result as string;
                  handleCapture(imageData);
                };
                reader.onerror = (error) => {
                  console.error('Error reading file:', error);
                  setState('camera');
                };
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
            id="file-input"
          />
        </div>
      )}
      
      {state === 'processing' && (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-sm text-gray-600">Processing receipt...</p>
        </div>
      )}
      
      {state === 'review' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Review Scanned Items</h2>
          <ScanReview
            data={scanData}
            onSave={handleSaveItems}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}