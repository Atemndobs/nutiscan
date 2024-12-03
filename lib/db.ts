import Dexie from 'dexie';
import 'dexie-observable';

// Define comprehensive interfaces for data models
export interface Category {
  id?: string;
  name: string;
  icon?: string;
}

export interface Product {
  id?: string;
  name: string;
  category?: string;
  price: number;
  quantity?: number;
  barcode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Scan {
  id?: string;
  storeName: string;
  storeAddress?: string;
  scanDate: Date;
  products: Product[];
  totalAmount: number;
  tags?: string[];
}

export interface Settings {
  id?: string;
  currency: string;
  defaultCategory?: string;
  theme: 'light' | 'dark';
  notifications: boolean;
}

class NutiscanDatabase extends Dexie {
  categories: Dexie.Table<Category, string>;
  products: Dexie.Table<Product, string>;
  scans: Dexie.Table<Scan, string>;
  settings: Dexie.Table<Settings, string>;

  constructor() {
    super('NutiscanDatabase');
    
    this.version(1).stores({
      categories: '++id, name',
      products: '++id, name, category, price, barcode, createdAt, updatedAt',
      scans: '++id, storeName, scanDate, totalAmount',
      settings: '++id'
    });

    this.categories = this.table('categories');
    this.products = this.table('products');
    this.scans = this.table('scans');
    this.settings = this.table('settings');
  }

  // Comprehensive methods for data management
  async addCategory(category: Category) {
    return this.transaction('rw', this.categories, async () => {
      return this.categories.add({
        ...category,
        name: category.name.trim()
      });
    });
  }

  async addScan(scan: Scan) {
    return this.transaction('rw', this.scans, this.products, async () => {
      // Validate and process products
      const processedProducts = scan.products.map(product => ({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      // Calculate total amount
      const totalAmount = processedProducts.reduce((sum, product) => 
        sum + (product.price * (product.quantity || 1)), 0);

      const newScan: Scan = {
        ...scan,
        scanDate: new Date(),
        products: processedProducts,
        totalAmount
      };

      return this.scans.add(newScan);
    });
  }

  async getRecentScans(limit: number = 10) {
    return this.transaction('r', this.scans, async () => {
      return this.scans
        .orderBy('scanDate')
        .reverse()
        .limit(limit)
        .toArray();
    });
  }

  async searchProducts(query: string) {
    return this.transaction('r', this.products, async () => {
      return this.products
        .where('name')
        .startsWithIgnoreCase(query)
        .or('barcode')
        .equals(query)
        .toArray();
    });
  }

  async updateSettings(settings: Partial<Settings>) {
    return this.transaction('rw', this.settings, async () => {
      const existingSettings = await this.settings.toArray();
      
      if (existingSettings.length > 0) {
        return this.settings.update(existingSettings[0].id!, settings);
      } else {
        return this.settings.add({
          currency: 'EUR',
          theme: 'light',
          notifications: true,
          ...settings
        });
      }
    });
  }

  // Utility methods
  async clearAllData() {
    return this.transaction('rw', 
      this.categories, 
      this.products, 
      this.scans, 
      this.settings, 
      async () => {
        await this.categories.clear();
        await this.products.clear();
        await this.scans.clear();
        await this.settings.clear();
      }
    );
  }
}

export const db = new NutiscanDatabase();

// Export a utility for state management
export const StateManager = {
  async initializeDefaultData() {
    // Check if initial data exists, if not, populate
    const categoriesCount = await db.categories.count();
    if (categoriesCount === 0) {
      await db.categories.bulkAdd([
        { name: 'Groceries', icon: 'shopping-cart' },
        { name: 'Electronics', icon: 'laptop' },
        { name: 'Clothing', icon: 't-shirt' },
        { name: 'Restaurants', icon: 'utensils' }
      ]);
    }

    const settingsCount = await db.settings.count();
    if (settingsCount === 0) {
      await db.updateSettings({
        currency: 'EUR',
        theme: 'light',
        notifications: true
      });
    }
  },

  async exportData() {
    const categories = await db.categories.toArray();
    const products = await db.products.toArray();
    const scans = await db.scans.toArray();
    const settings = await db.settings.toArray();

    return {
      categories,
      products,
      scans,
      settings
    };
  },

  async importData(data: ReturnType<typeof StateManager.exportData>) {
    await db.clearAllData();
    
    await db.categories.bulkAdd(data.categories);
    await db.products.bulkAdd(data.products);
    await db.scans.bulkAdd(data.scans);
    await db.settings.bulkAdd(data.settings);
  }
};
