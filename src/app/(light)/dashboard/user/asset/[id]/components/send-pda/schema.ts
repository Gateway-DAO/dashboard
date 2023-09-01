import { FieldError } from 'react-hook-form';
import { z } from 'zod';

export type SendPdaSchema = {
  id: string;
  account_type?: string;
  address?: string;
  image?: string;
};

export type SendPdaSchemaError = {
  id?: FieldError;
  account_type?: FieldError;
  address?: FieldError;
  image?: FieldError;
};

export const sendPdaSchema = z.object({
  account_type: z.string({ required_error: 'Account type is required' }),
  address: z
    .string({ required_error: 'Address is required' })
    .min(2, 'The address must contain at least 2 character(s)'),
  image: z.string().nullish(),
});
