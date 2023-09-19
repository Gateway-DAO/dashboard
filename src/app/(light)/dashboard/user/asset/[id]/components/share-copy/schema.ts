import { IdentifierType } from '@/services/protocol/types';
import { FieldError } from 'react-hook-form';
import { z } from 'zod';

const usernameRegex =
  /^(?!.*\.\.)(?!.*\.\.$)(?!.*--)(?!.*--$)(?!.*__)(?!.*__$)[a-z0-9._-]{2,19}[a-z0-9]$/;
const ethRegex = /^0x[a-fA-F0-9]{40}$/;

export type ShareCopySchema = {
  id: string;
  identifier_type?: string;
  address?: string;
  image?: string;
};

export type ShareCopySchemaError = {
  id?: FieldError;
  identifier_type?: FieldError;
  address?: FieldError;
  image?: FieldError;
};

const image = z.string().nullish();
const address = z
  .string({ required_error: 'Address is required' })
  .min(2, 'The field must contain at least 2 character(s)');

export const shareCopySchema = z.discriminatedUnion('identifier_type', [
  z.object({
    identifier_type: z.literal(IdentifierType.GatewayId),
    address: address.regex(RegExp(usernameRegex), {
      message: 'Only lowercase letters, numbers and ._-',
    }),
    image,
  }),
  z.object({
    identifier_type: z.literal(IdentifierType.Email),
    address: address.email(),
    image,
  }),
  z.object({
    identifier_type: z.literal(IdentifierType.Evm),
    address: address.regex(RegExp(ethRegex), {
      message: 'Invalid EVM Wallet',
    }),
    image,
  }),
  z.object({
    identifier_type: z.literal(IdentifierType.Solana),
    address,
    image,
  }),
]);
