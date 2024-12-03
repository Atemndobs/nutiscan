"use client";

import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose?: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const [isClient, setIsClient] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Refs for tracking component state
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInitializedRef = useRef(false);

  // Safe media devices check
  const checkMediaDevices = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    // Check for standard and legacy media device support
    return !!(
      navigator.mediaDevices && 
      typeof navigator.mediaDevices.getUserMedia === 'function'
    ) || !!(
      (navigator as any).webkitGetUserMedia || 
      (navigator as any).mozGetUserMedia
    );
  };

  // Attempt to get camera permission
  const requestCameraPermission = async () => {
    try {
      // Ensure we're in a browser environment
      if (typeof navigator === 'undefined' || typeof navigator.mediaDevices === 'undefined') {
        setPermissionError('Browser does not support camera access');
        return false;
      }

      // Request camera permission
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      return true;
    } catch (error) {
      console.error('Camera permission error:', error);
      setPermissionError('Camera permission denied. Please allow camera access.');
      setHasPermission(false);
      return false;
    }
  };

  // ZXing hook for barcode scanning
  const { ref } = useZxing({
    onDecodeResult(result) {
      onResult(result.getText());
    },
    onError(error) {
      console.error('Scanner error:', error);
      setPermissionError('Scanner initialization failed');
    }
  });

  // Client-side initialization effect
  useEffect(() => {
    // Mark as client-side
    setIsClient(true);

    // Check media device support
    const mediaSupported = checkMediaDevices();
    if (!mediaSupported) {
      setPermissionError('Camera access is not supported on this device');
      return;
    }

    // Prevent multiple initializations
    if (isInitializedRef.current) return;

    // Request camera permission
    const initCamera = async () => {
      const permitted = await requestCameraPermission();
      if (permitted) {
        isInitializedRef.current = true;
      }
    };

    initCamera();

    // Cleanup
    return () => {
      isInitializedRef.current = false;
    };
  }, []);

  // Render nothing on server, or show error on client
  if (!isClient) {
    return null;
  }

  // Render scanner or error
  return (
    <Card className="p-4 relative">
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {permissionError ? (
        <div className="text-red-500 text-center p-4">
          {permissionError}
        </div>
      ) : (
        <div className="w-full">
          <video 
            ref={ref} 
            className="w-full rounded-lg"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
      )}
    </Card>
  );
}
