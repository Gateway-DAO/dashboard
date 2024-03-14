import { NextRequest, NextResponse, userAgent } from 'next/server';

export async function GET(request: NextRequest) {
  const { isBot, browser, os } = userAgent(request);

  return NextResponse.json({ browser, os });
}
