import { getStorageClient } from '@/services/gcp';
import { getRedisClient } from '@/services/redis';

export async function createSignedUrl(did: string) {
  // Initialize Google Cloud Storage client
  const storage = getStorageClient();
  const bucketName = process.env.GCP_BUCKET_NAME;
  const bucket = storage.bucket(bucketName!);
  console.log('bucket', bucket);

  const redis = await getRedisClient();
  try {
    const key = `pfp:${did}`;

    const cachedUrl = await redis.get(key);
    console.log('cachedUrl', cachedUrl);

    if (cachedUrl) {
      return cachedUrl;
    }

    const file = bucket.file(did);
    console.log('file', file);
    const ttl = Date.now() + 15 * 60 * 1000;
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: ttl, // 15 minutes
    });
    console.log('url', url);

    await redis.set(key, url, 'PX', ttl);

    return url;
  } catch (error) {
    console.error(did, error);
    return null;
  } finally {
    await redis.quit();
  }
}

export async function popSignedUrl(did: string) {
  const redis = await getRedisClient();
  try {
    const key = `pfp:${did}`;
    const url = await redis.get(key);
    await redis.del(key);
    return url;
  } catch (error) {
    console.error(did, error);
    return null;
  } finally {
    await redis.quit();
  }
}
