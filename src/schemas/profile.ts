import { usernameRegex } from '@/constants/identity';
import { auth } from '@/locale/en/auth';
import zod from 'zod';

export const usernameSchema = zod.preprocess(
  (value: unknown) => (typeof value === 'string' ? value.trim() : value),
  zod
    .string({ required_error: 'Code is required' })
    .min(2, "Username can't be less than 2 characters")
    .max(15)
    .refine(
      (value) => usernameRegex.test(value),
      auth.steps.choose_gateway_id.create_username_rules
    )
);

export const displayNameSchema = zod.preprocess((value) => {
  if (!value || typeof value !== 'string') return undefined;
  return value === '' ? undefined : value.trim();
}, zod.string().min(2).optional());
