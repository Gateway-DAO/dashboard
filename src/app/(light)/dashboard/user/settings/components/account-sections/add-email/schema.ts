import { FieldError } from 'react-hook-form';
import { z } from 'zod';

export type EmailSchema = {
  email_address: string;
};

export type EmailSchemaError = {
  email_address?: FieldError;
};

export const schemaEmail = z.object({
  email_address: z.string().email(),
});

export type TokenConfirmationSchema = {
  code: string;
};

export type TokenConfirmationSchemaError = {
  code?: FieldError;
};

export const schemaTokenConfirmation = z.object({
  code: z.string().min(6, 'Invalid code').max(6, 'Invalid code'),
});
