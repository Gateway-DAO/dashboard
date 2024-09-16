import { NextResponse } from 'next/server';

import { getServerComponentSession } from '@/services/next-auth/config';

import { getSignedUrl } from './utils';

export async function GET() {
  const session = await getServerComponentSession();

  if (!session?.user?.did) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const signedUrl = await getSignedUrl(session.user.did);

  if (!signedUrl) {
    return NextResponse.json('Failed to generate signed URL', { status: 500 });
  }

  return NextResponse.json(signedUrl);
}
