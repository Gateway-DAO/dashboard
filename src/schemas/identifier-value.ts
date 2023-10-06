import { usernameRegex } from '@/constants/username';
import { ethRegex } from '@/constants/wallet';
import { IdentifierType } from '@/services/protocol/types';
import { PublicKey } from '@solana/web3.js';
import zod from 'zod';

const address = zod
  .string({ required_error: 'Address is required' })
  .min(2, 'The field must contain at least 2 character(s)');

const identifierValueSchema = zod.discriminatedUnion('type', [
  zod.object({
    type: zod.literal(IdentifierType.GatewayId),
    address: address.regex(RegExp(usernameRegex), {
      message: 'Only lowercase letters, numbers and ._-',
    }),
  }),
  zod.object({
    type: zod.literal(IdentifierType.Email),
    address: address.email(),
  }),
  zod.object({
    type: zod.literal(IdentifierType.Evm),
    address: address.regex(RegExp(ethRegex), {
      message: 'Invalid EVM Wallet',
    }),
  }),
  zod.object({
    type: zod.literal(IdentifierType.Solana),
    address: zod
      .string()
      .min(33, 'Invalid Solana Wallet')
      .refine(
        async (wallet: string) => {
          try {
            const publicKey = new PublicKey(wallet);
            return PublicKey.isOnCurve(publicKey.toBytes());
          } catch {
            return false;
          }
        },
        { message: 'Invalid Solana Wallet' }
      ),
  }),
]);

export type IdentifierValueSchema = zod.infer<typeof identifierValueSchema>;

export default identifierValueSchema;
