import { NextRequest, NextResponse, userAgent } from 'next/server';

import externalLinks from '@/constants/externalLinks';

export async function GET(request: NextRequest) {
  const { os } = userAgent(request);
  const osName = os.name?.toLowerCase() ?? '';
  if (osName.includes('ios') || osName.includes('mac')) {
    return NextResponse.redirect(externalLinks.gateway_wallet_ios);
  }

  return NextResponse.redirect(externalLinks.gateway_wallet_android);
}
