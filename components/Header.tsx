"use client";

import { useState } from "react";
import { Search, ScanLine } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent } from "./ui/dialog";
import { Scanner } from "./Scanner";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Receipt Scanner</h1>
          <p className="text-muted-foreground">Track your groceries</p>
        </div>
        <Button 
          size="icon" 
          variant="secondary" 
          className="rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <ScanLine className="w-4 h-4" />
        </Button>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <Scanner />
        </DialogContent>
      </Dialog>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search items..." 
          className="pl-10 bg-secondary/30 border-0 rounded-full"
        />
      </div>
    </div>
  );
}