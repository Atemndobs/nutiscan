import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface ProductWithScan {
  id: string;
  name: string;
  category: string | null;
  createdAt: Date;
  scan: {
    storeName: string;
    address: string;
  };
}

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const categoryName = decodeURIComponent(params.name);
    
    const products = await prisma.product.findMany({
      where: {
        category: categoryName
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        category: true,
        createdAt: true,
        scan: {
          select: {
            storeName: true,
            address: true,
          }
        }
      }
    });

    // Transform the data to match the expected format
    const items = products.map((product: ProductWithScan) => ({
      id: product.id,
      name: product.name,
      category: product.category || '',
      date: product.createdAt.toISOString(),
      storeName: product.scan.storeName,
      address: product.scan.address
    }));

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching category items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category items' },
      { status: 500 }
    );
  }
}
