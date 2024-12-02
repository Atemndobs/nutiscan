import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Log to server console
  console.log('[CLIENT LOG]', JSON.stringify(data, null, 2));
  
  return NextResponse.json({ status: 'ok' });
}
