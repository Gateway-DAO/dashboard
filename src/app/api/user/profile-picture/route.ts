import { NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';
import { getServerComponentSession } from '@/services/next-auth/config';

import { createSignedUrl, popSignedUrl } from './utils';

export async function GET() {
  const session = await getServerComponentSession();

  if (!session?.user?.did) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const signedUrl = await createSignedUrl(session.user.did);

  if (!signedUrl) {
    return NextResponse.json('Failed to generate signed URL', { status: 500 });
  }

  return NextResponse.json(signedUrl);
}

export async function PATCH() {
  const session = await getServerComponentSession();

  if (!session?.user?.did) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const signedUrl = await popSignedUrl(session.user.did);

  if (!signedUrl) {
    return NextResponse.json('No signed URL found', { status: 404 });
  }

  const profile_picture = new URL(signedUrl.split('?')[0]!);

  const hash = Math.random().toString(36).substring(7);

  profile_picture.searchParams.set('hash', hash);

  const { data, error } = await authApi(session.token).PATCH('/accounts/me', {
    body: { profile_picture: profile_picture.toString() },
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
