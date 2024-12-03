import Dexie from 'dexie';
import 'dexie-observable';
import 'dexie-syncable';

// Define interfaces for your data models
export interface Product {
  id?: string;
  name: string;
  category?: string;
  price?: number;
  scanId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Scan {
  id?: string;
  storeName: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[];
}

class NutiscanDatabase extends Dexie {
  products: Dexie.Table<Product, string>;
  scans: Dexie.Table<Scan, string>;

  constructor() {
    super('NutiscanDatabase');
    
    this.version(1).stores({
      scans: '++id, storeName, address, createdAt, updatedAt',
      products: '++id, name, category, price, scanId, createdAt, updatedAt'
    });

    this.products = this.table('products');
    this.scans = this.table('scans');
  }

  // Sync method to synchronize with a remote database
  async syncWithRemote(remoteUrl: string) {
    try {
      // Configure sync with a remote database
      await this.syncable.connect('websocket', remoteUrl);
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }

  // Method to add a scan with its products
  async addScanWithProducts(scan: Scan) {
    return this.transaction('rw', this.scans, this.products, async () => {
      // First, add the scan
      const scanId = await this.scans.add({
        storeName: scan.storeName,
        address: scan.address,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Then add products associated with the scan
      if (scan.products) {
        const productsWithScanId = scan.products.map(product => ({
          ...product,
          scanId: scanId.toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        }));

        await this.products.bulkAdd(productsWithScanId);
      }

      return scanId;
    });
  }

  // Method to get recent scans with their products
  async getRecentScans(limit: number = 3) {
    return this.transaction('r', this.scans, this.products, async () => {
      const recentScans = await this.scans
        .orderBy('createdAt')
        .reverse()
        .limit(limit)
        .toArray();

      // Fetch products for each scan
      const scansWithProducts = await Promise.all(
        recentScans.map(async (scan) => {
          const products = await this.products
            .where('scanId')
            .equals(scan.id!.toString())
            .toArray();

          return {
            ...scan,
            products
          };
        })
      );

      return scansWithProducts;
    });
  }
}

export const db = new NutiscanDatabase();
