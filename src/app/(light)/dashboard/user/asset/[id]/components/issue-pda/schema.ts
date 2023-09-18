import { FieldError } from 'react-hook-form';
import { z } from 'zod';

const usernameRegex =
  /^(?!.*\.\.)(?!.*\.\.$)(?!.*--)(?!.*--$)(?!.*__)(?!.*__$)[a-z0-9._-]{2,19}[a-z0-9]$/;
const ethRegex = /^0x[a-fA-F0-9]{40}$/;

export type IssuePdaSchema = {
  id: string;
  account_type?: string;
  address?: string;
  image?: string;
};

export type IssuePdaSchemaError = {
  id?: FieldError;
  account_type?: FieldError;
  address?: FieldError;
  image?: FieldError;
};

const image = z.string().nullish();
const address = z
  .string({ required_error: 'Address is required' })
  .min(2, 'The field must contain at least 2 character(s)');

export const issuePdaSchema = z.discriminatedUnion('account_type', [
  z.object({
    account_type: z.literal('Gateway ID'),
    address: address.regex(RegExp(usernameRegex), {
      message: 'Only lowercase letters, numbers and ._-',
    }),
    image,
  }),
  z.object({
    account_type: z.literal('Email'),
    address: address.email(),
    image,
  }),
  z.object({
    account_type: z.literal('EVM Wallet'),
    address: address.regex(RegExp(ethRegex), {
      message: 'Invalid EVM Wallet',
    }),
    image,
  }),
  z.object({
    account_type: z.literal('Solana Wallet'),
    address,
    image,
  }),
]);
