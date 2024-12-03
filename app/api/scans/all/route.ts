import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const scans = await prisma.scan.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
            barcode: true,
            brand: true,
            category: true,
            imageUrl: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(scans);
  } catch (error) {
    console.error('Error fetching all scans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scans' },
      { status: 500 }
    );
  }
}
