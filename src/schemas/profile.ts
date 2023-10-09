import { usernameRegex } from '@/constants/username';
import zod from 'zod';

export const usernameSchema = zod
  .string({ required_error: 'Code is required' })
  .min(2, "Username can't be less than 2 characters")
  .max(20)
  .refine(
    (value) => usernameRegex.test(value),
    'Only lowercase letters, numbers and ._-'
  );

export const displayNameSchema = zod.preprocess((value) => {
  if (!value || typeof value !== 'string') return undefined;
  return value === '' ? undefined : value;
}, zod.string().min(2).optional());
