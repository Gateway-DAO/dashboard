import { Redis } from 'ioredis';

export async function getRedisClient() {
  return new Redis(process.env.REDIS_HOST!);
}
