import { JWT, getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/services/protocol/api';
import { uploadData } from '@/utils/irys';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get('image') as Blob;
  const organization = formData.get('organization') as string;
  const token = (await getToken({ req: request })) as JWT | null;
  if (!token?.token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const imageBuffer = await image.arrayBuffer();
  const buffer = await sharp(imageBuffer).resize(200, 200).toBuffer();

  try {
    const uploadedImage = await uploadData(buffer, [
      {
        name: 'Content-Type',
        value: 'image/png',
      },
    ]);

    if (organization) {
      const updateImage = await api(token.token).update_org_image({
        image: `https://arweave.net/${uploadedImage.id}`,
        id: organization,
      });

      return NextResponse.json({ image: updateImage.updateOrganization.image });
    }

    const updateImage = await api(token.token).update_profile_picture_url({
      profilePicture: `https://arweave.net/${uploadedImage.id}`,
    });

    return NextResponse.json({ image: updateImage.updateUser.profilePicture });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
