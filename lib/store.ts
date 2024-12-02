import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Item {
  id: string;
  name: string;
  calories: number;
  category: string;
  price: number;
  date: string;
}

interface ReceiptStore {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

export const useReceiptStore = create<ReceiptStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'receipt-storage',
    }
  )
);