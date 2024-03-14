import { NextRequest, NextResponse, userAgent } from 'next/server';

export async function GET(request: NextRequest) {
  const { os } = userAgent(request);
  const osName = os.name?.toLowerCase() ?? '';
  if (osName.includes('ios') || osName.includes('mac')) {
    return NextResponse.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }

  return NextResponse.redirect('https://www.youtube.com/watch?v=BbeeuzU5Qc8');
}
