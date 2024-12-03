export interface Product {
  id: string;
  name: string;
  category: string | null;
  price: number | null;
  createdAt?: string;
}

export interface Scan {
  id: string;
  storeName: string;
  address: string;
  createdAt: string;
  products: Product[];
}
