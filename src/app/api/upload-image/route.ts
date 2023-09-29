import { JWT, getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/services/protocol/api';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get('image') as Blob;
  const token = (await getToken({ req: request })) as JWT | null;
  if (!token?.token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const imageBuffer = await image.arrayBuffer();

  const buffer = await sharp(imageBuffer).resize(200, 200).toBuffer();

  const newFormData = new FormData();
  newFormData.append(
    'file',
    new Blob([buffer]),
    `${token.protocol_id}-avatar.jpg`
  );

  const uploadImageResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/arweave/upload-file-to-arweave`,
    {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
        'x-api-secret': process.env.SECURE_API_KEY,
        Authorization: `Bearer ${token.token}`,
      },
      body: newFormData,
    }
  );

  const uploadedImage = (await uploadImageResponse.json()) as
    | { error: string }
    | { url: string };

  if ('error' in uploadedImage) {
    return NextResponse.json({ error: uploadedImage.error }, { status: 400 });
  }

  const updateImage = await api(token.token).update_user({
    profileImage: uploadedImage.url,
  });

  return NextResponse.json({ image: updateImage.updateUser.profileImage });
}
