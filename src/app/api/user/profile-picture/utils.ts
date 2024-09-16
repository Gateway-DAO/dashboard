import { getStorageClient } from '@/services/gcp';
import { getRedisClient } from '@/services/redis';

export async function getSignedUrl(did: string) {
  // Initialize Google Cloud Storage client
  const storage = getStorageClient();
  const bucketName = process.env.GCP_BUCKET_NAME;
  const bucket = storage.bucket(bucketName!);

  const redis = await getRedisClient();
  try {
    const key = `pfp:${did}`;

    const cachedUrl = await redis.get(key);

    if (cachedUrl) {
      return cachedUrl;
    }

    const file = bucket.file(did);
    const ttl = Date.now() + 15 * 60 * 1000;
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: ttl, // 15 minutes
    });

    await redis.set(key, url, 'PX', ttl);

    return url;
  } catch (error) {
    console.error(did, error);
    return null;
  } finally {
    await redis.quit();
  }
}
