import { usernameRegex } from '@/constants/username';
import { auth } from '@/locale/en/auth';
import zod from 'zod';

export const usernameSchema = zod.preprocess(
  (value: unknown) => (typeof value === 'string' ? value.trim() : value),
  zod
    .string({ required_error: 'Code is required' })
    .min(2, "Username can't be less than 2 characters")
    .max(15)
    .refine((value) => usernameRegex.test(value), auth.rules.create_username)
);

export const displayNameSchema = zod.preprocess((value) => {
  if (!value || typeof value !== 'string') return undefined;
  return value === '' ? undefined : value.trim();
}, zod.string().min(2).optional());
