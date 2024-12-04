import { db } from './db';
import { categories } from './categories';

export async function addTestData() {
  if (typeof window === 'undefined' || !db) {
    console.warn('Cannot add test data outside of browser or without database');
    return;
  }

  try {
    // Clear existing data
    await db.product.deleteMany();
    await db.scan.deleteMany();

    // Add some test scans with products
    const testScans = [
      {
        id: '1',
        storeName: 'Whole Foods Market',
        address: '123 Organic Way, Healthy City',
        products: [
          {
            name: 'Organic Apples',
            category: 'Fruits',
            price: 5.99
          },
          {
            name: 'Grass-Fed Beef',
            category: 'Meat',
            price: 15.50
          }
        ]
      },
      {
        id: '2',
        storeName: 'Local Farmers Market',
        address: '456 Green Street, Organic Town',
        products: [
          {
            name: 'Fresh Carrots',
            category: 'Veges',
            price: 4.50
          },
          {
            name: 'Organic Milk',
            category: 'Dairy',
            price: 6.99
          }
        ]
      }
    ];

    // Add scans with their products
    for (const scan of testScans) {
      // First create the scan
      const createdScan = await db.scan.create({
        data: {
          id: scan.id,
          storeName: scan.storeName,
          address: scan.address
        }
      });

      // Then create products associated with this scan
      const productsWithScanId = scan.products.map(product => ({
        name: product.name,
        category: product.category,
        price: product.price,
        scanId: createdScan.id
      }));

      await db.product.createMany({
        data: productsWithScanId
      });
    }

    console.log('Test data added successfully');
    return { status: 'success', message: 'Test data added successfully' };
  } catch (error) {
    console.error('Error adding test data:', error);
  }
}

// Function to verify test data
export async function verifyTestData() {
  if (typeof window === 'undefined' || !db) {
    console.warn('Cannot verify test data outside of browser or without database');
    return;
  }

  try {
    const scans = await db.scan.findMany();
    const products = await db.product.findMany();

    console.log('Scans:', scans);
    console.log('Products:', products);

    return {
      scansCount: scans.length,
      productsCount: products.length,
      scans,
      products
    };
  } catch (error) {
    console.error('Error verifying test data:', error);
    return null;
  }
}

// Function to add test data and verify in one go
export async function setupTestEnvironment() {
  await addTestData();
  return await verifyTestData();
}
