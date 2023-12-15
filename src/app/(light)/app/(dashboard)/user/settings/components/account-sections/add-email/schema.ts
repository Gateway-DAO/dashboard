import { FieldError } from 'react-hook-form';
import zod from 'zod';

export type EmailSchemaError = {
  email_address?: FieldError;
};

export type TokenConfirmationSchemaError = {
  code?: FieldError;
};

export const schemaEmail = zod.object({
  email_address: zod.string().email(),
});

export const schemaTokenConfirmation = zod.object({
  code: zod.string().min(6, 'Invalid code').max(6, 'Invalid code'),
});

export type EmailSchema = zod.infer<typeof schemaEmail>;
export type TokenConfirmationSchema = zod.infer<typeof schemaTokenConfirmation>;
