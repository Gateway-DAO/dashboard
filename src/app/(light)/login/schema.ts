import { usernameSchema } from '@/schemas/username';
import { z } from 'zod';

export type TokenConfirmationSchema = {
  code: string;
};
export type AddEmailConfirmationSchema = {
  code: string;
  email: string;
};

export const schemaEmail = z.object({
  email_address: z.string({ required_error: 'Email is required' }),
});

export type EmailSchema = z.infer<typeof schemaEmail>;

export const schemaTokenConfirmation = z.object({
  email_address: z
    .string({ required_error: 'Code is required' })
    .min(6, 'Invalid code')
    .max(6, 'Invalid code'),
});

export const createProfileSchema = z.object({
  username: usernameSchema,
  displayName: z.preprocess((value) => {
    if (!value || typeof value !== 'string') return undefined;
    return value === '' ? undefined : value;
  }, z.string().min(2).optional()),
});

export type CreateProfileSchema = z.infer<typeof createProfileSchema>;
