import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { subDays } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get all products for the last 7 days
    const sevenDaysAgo = subDays(new Date(), 7);
    
    const products = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      include: {
        scans: {
          select: {
            id: true,
            createdAt: true,
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Transform products into the format we need
    const items = products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category || '',
      date: product.createdAt.toISOString(),
      scans: product.scans.map(scan => ({
        id: scan.id,
        date: scan.createdAt.toISOString()
      }))
    }));

    // Calculate stats
    const stats = {
      items,
      totalItems: items.length,
      byCategory: {} as Record<string, number>,
      byDate: {} as Record<string, number>,
    };

    // Calculate category breakdown
    items.forEach(item => {
      if (item.category) {
        stats.byCategory[item.category] = (stats.byCategory[item.category] || 0) + 1;
      }
    });

    // Calculate daily breakdown
    items.forEach(item => {
      const date = new Date(item.date).toISOString().split('T')[0];
      stats.byDate[date] = (stats.byDate[date] || 0) + 1;
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
