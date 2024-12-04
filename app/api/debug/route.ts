import { NextResponse } from 'next/server';
import { db, checkDatabaseState } from '@/lib/db';
import { addTestData, verifyTestData } from '@/lib/test-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return NextResponse.json({ message: 'Server-side rendering' }, { status: 200 });
    }

    // Handle different debug actions
    switch (action) {
      case 'setup-test-data':
        const setupResult = await addTestData();
        return NextResponse.json({ 
          message: 'Test data setup complete',
          result: setupResult 
        });

      case 'verify-data':
        const verificationResult = await verifyTestData();
        return NextResponse.json({ 
          message: 'Data verification complete',
          result: verificationResult 
        });

      case 'check-state':
        const databaseState = await checkDatabaseState();
        return NextResponse.json({ 
          message: 'Database state checked',
          result: databaseState 
        });

      default:
        // Default debug info
        const state = await checkDatabaseState();
        
        return NextResponse.json({
          message: 'Debug info',
          databaseState: state
        });
    }
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch debug info', 
      details: error instanceof Error ? {
        message: error.message,
        name: error.name,
        stack: error.stack
      } : 'Unknown error' 
    }, { status: 500 });
  }
}
