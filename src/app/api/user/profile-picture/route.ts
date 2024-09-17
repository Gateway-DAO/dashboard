import { NextResponse } from 'next/server';

import { getServerComponentSession } from '@/services/next-auth/config';

import { createSignedUrl, popSignedUrl } from './utils';
import { authApi } from '@/services/api/api';

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
  console.log(signedUrl);

  if (!signedUrl) {
    return NextResponse.json('No signed URL found', { status: 404 });
  }

  const { data, error } = await authApi(session.token).PATCH('/accounts/me', {
    body: { profile_picture: signedUrl.split('?')[0] },
  });

  console.log(
    {
      body: {
        profile_picture: signedUrl.split('?')[0],
      },
    },
    data,
    error
  );

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
