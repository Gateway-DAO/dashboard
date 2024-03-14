import { NextRequest, NextResponse, userAgent } from 'next/server';

export async function GET(request: NextRequest) {
  const { os } = userAgent(request);
  console.log(os);
  // If linux, windows, or android redirect
  return NextResponse.json({ os });
}
