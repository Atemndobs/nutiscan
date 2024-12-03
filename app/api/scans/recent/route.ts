import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const recentScans = await prisma.scan.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            category: true,
            price: true
          }
        }
      }
    });

    // Calculate top category for each scan
    const scansWithTopCategory = recentScans.map(scan => {
      const categoryCount: Record<string, number> = {};
      scan.products.forEach(product => {
        if (product.category) {
          categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
        }
      });

      const topCategory = Object.entries(categoryCount)
        .sort(([, a], [, b]) => b - a)
        .map(([category]) => category)[0] || null;

      return {
        id: scan.id,
        storeName: scan.storeName,
        address: scan.address,
        createdAt: scan.createdAt,
        topCategory,
        productCount: scan.products.length,
        products: scan.products  // Include full product details
      };
    });

    return NextResponse.json(scansWithTopCategory);
  } catch (error) {
    console.error('Error fetching recent scans:', error);
    return NextResponse.json({ error: 'Failed to fetch recent scans' }, { status: 500 });
  }
}
