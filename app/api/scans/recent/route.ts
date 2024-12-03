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
        product: {
          select: {
            category: true
          }
        }
      }
    });

    // Calculate top category for each scan
    const scansWithTopCategory = recentScans.map(scan => {
      const categoryCount: Record<string, number> = {};
      if (scan.product.category) {
        categoryCount[scan.product.category] = 1;
      }

      const topCategory = Object.entries(categoryCount)
        .sort(([, a], [, b]) => b - a)
        .map(([category]) => category)[0] || null;

      return {
        id: scan.id,
        storeName: scan.storeName,
        address: scan.address,
        createdAt: scan.createdAt,
        topCategory,
        productCount: scan.product ? 1 : 0
      };
    });

    return NextResponse.json(scansWithTopCategory);
  } catch (error) {
    console.error('Error fetching recent scans:', error);
    return NextResponse.json({ error: 'Failed to fetch recent scans' }, { status: 500 });
  }
}
