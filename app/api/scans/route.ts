import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storeName, storeAddress, items } = body;

    // Create a new scan with products
    const scan = await prisma.scan.create({
      data: {
        storeName,
        address: storeAddress,
        products: {
          create: items.map((item: any) => ({
            name: item.name,
            category: item.category,
            price: item.price || 0  // Explicitly add price, defaulting to 0 if not provided
          }))
        }
      },
      include: {
        products: true
      }
    });

    return NextResponse.json(scan);
  } catch (error) {
    console.error('Error creating scan:', error);
    return NextResponse.json(
      { error: 'Failed to create scan' },
      { status: 500 }
    );
  }
}
