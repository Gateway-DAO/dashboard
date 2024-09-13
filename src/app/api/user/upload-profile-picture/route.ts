import { NextRequest, NextResponse } from 'next/server';

import { getServerComponentSession } from '@/services/next-auth/config';
import sharp from 'sharp';

import {
  uploadImageToBucket,
  deleteBucketImage,
  updateProfilePicture,
} from './utils';

// TODO: Implement the API ROUTE to update the user profile picture
// TODO: Implement verification to check image size, only resize if needed
// TODO: Implement file upload on frontend
// TODO: Implement throttle to prevent abuse using GCP MemoryStore

export async function POST(req: NextRequest) {
  // Check if user is authenticated
  const session = await getServerComponentSession();
  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      {
        status: 401,
      }
    );
  }

  // Parse the incoming form data
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file || typeof file.arrayBuffer !== 'function') {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
  }

  // Convert the Blob (FormDataEntryValue) to an ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  // Convert the ArrayBuffer to a Buffer for Sharp
  const buffer = Buffer.from(arrayBuffer);

  try {
    // Process the image with sharp (resize to 150x150)
    const processedImageBuffer = await sharp(buffer)
      .resize(150, 150)
      .toFormat('jpeg')
      .toBuffer();

    const publicUrl = await uploadImageToBucket(
      processedImageBuffer,
      session.user
    );

    if (session.user.profile_picture) {
      await deleteBucketImage(session.user.profile_picture);
    }

    const account = await updateProfilePicture(publicUrl, session.token);

    return NextResponse.json(account);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to process image', error },
      {
        status: 500,
      }
    );
  }
}
