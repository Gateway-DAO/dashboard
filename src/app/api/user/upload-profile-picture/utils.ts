import { Account } from '@/services/api/models';
import { getStorageClient } from '@/services/gcp';
import { randomUUID } from 'crypto';
import { Stream } from 'stream';

// Initialize Google Cloud Storage client
const storage = getStorageClient();
const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = storage.bucket(bucketName!);
const bucketUrl = `https://storage.googleapis.com/${bucketName}`;
// Upload the image to Google Cloud Storage
export const uploadImageToBucket = async (
  fileBuffer: Buffer,
  user: Account
): Promise<string> => {
  // Generate a unique filename for the image (using user ID or UUID)
  const filename = `${user.did}-${randomUUID()}.jpeg`;

  // Create a new blob in the bucket and upload the file data
  const blob = bucket.file(filename);
  // Create a write stream to upload the file
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: 'image/jpeg',
  });

  return new Promise((resolve, reject) => {
    const passthroughStream = new Stream.PassThrough();
    passthroughStream.write(fileBuffer);
    passthroughStream.end();

    const stream = passthroughStream.pipe(blobStream);
    stream.on('finish', () => {
      const publicUrl = `${bucketUrl}/${filename}`;
      return resolve(publicUrl);
    });
    stream.on('error', (err) => {
      return reject(err);
    });
  });
};
export async function deleteBucketImage(publicUrl?: string) {
  if (!publicUrl?.startsWith(`${bucketUrl}/`)) {
    return;
  }

  const filename = publicUrl.replace(`${bucketUrl}/`, '');
  const blob = bucket.file(filename);

  try {
    return blob.delete();
  } catch (error) {
    console.error('Failed to delete image from bucket', error);
    return;
  }
}
// TODO: Implement the API ROUTE to update the user profile picture
export async function updateProfilePicture(
  publicUrl: string,
  token: string
): Promise<Account> {
  //const {} = await authApi(token).PUT('/')
  return {} as Account;
}
