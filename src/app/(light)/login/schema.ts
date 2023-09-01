import { z } from 'zod';

export type EmailSchema = {
  email_address: string;
};

export type GatewayIdSchema = {
  gatewayId: string;
};
export type TokenConfirmationSchema = {
  code: string;
};
export type AddEmailConfirmationSchema = {
  code: string;
  email: string;
};

const usernameRegex =
  /^(?!.*\.\.)(?!.*\.\.$)(?!.*--)(?!.*--$)(?!.*__)(?!.*__$)[a-z0-9._-]{2,19}[a-z0-9]$/;

export const schemaEmail = z.object({
  email_address: z.string({ required_error: 'Email is required' }),
});

export const schemaTokenConfirmation = z.object({
  email_address: z
    .string({ required_error: 'Code is required' })
    .min(6, 'Invalid code')
    .max(6, 'Invalid code'),
});

export const schemaGatewayId = z.object({
  gatewayId: z
    .string({ required_error: 'Code is required' })
    .min(2)
    .max(20)
    .refine(
      (value) => usernameRegex.test(value),
      'Only lowercase letters, numbers and ._-'
    ),
});
