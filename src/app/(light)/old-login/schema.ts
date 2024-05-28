import { displayNameSchema, usernameSchema } from '@/schemas/profile';
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
  displayName: displayNameSchema,
});

export type CreateProfileSchema = z.infer<typeof createProfileSchema>;
