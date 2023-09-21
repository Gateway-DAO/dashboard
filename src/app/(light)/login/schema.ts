import { z } from 'zod';

export type EmailSchema = {
  email_address: string;
};

export type TokenConfirmationSchema = {
  code: string;
};
export type AddEmailConfirmationSchema = {
  code: string;
  email: string;
};

const usernameRegex =
  /^(?!.*\.\.)(?!.*\.\.$)(?!.*--)(?!.*--$)(?!.*__)(?!.*__$)[a-z0-9._-]{1,19}[a-z0-9]$/;

export const schemaEmail = z.object({
  email_address: z.string({ required_error: 'Email is required' }),
});

export const schemaTokenConfirmation = z.object({
  email_address: z
    .string({ required_error: 'Code is required' })
    .min(6, 'Invalid code')
    .max(6, 'Invalid code'),
});

export const usernameSchema = z.object({
  username: z
    .string({ required_error: 'Code is required' })
    .min(2, "Username can't be less than 2 characters")
    .max(20)
    .refine(
      (value) => usernameRegex.test(value),
      'Only lowercase letters, numbers and ._-'
    ),
  displayName: z.preprocess((value) => {
    if (!value || typeof value !== 'string') return undefined;
    return value === '' ? undefined : value;
  }, z.string().min(2).optional()),
});

export type UsernameSchema = z.infer<typeof usernameSchema>;
