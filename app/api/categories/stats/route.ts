import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CategoryName } from '@/lib/categories';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categoryCounts = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        _all: true
      }
    });

    // Convert to a map of category -> count
    const counts: Record<CategoryName, number> = {} as Record<CategoryName, number>;
    categoryCounts.forEach(({ category, _count }) => {
      if (category) {
        counts[category as CategoryName] = _count._all;
      }
    });

    return NextResponse.json(counts);
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return NextResponse.json({ error: 'Failed to fetch category stats' }, { status: 500 });
  }
}
