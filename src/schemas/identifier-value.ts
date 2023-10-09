import { usernameRegex } from '@/constants/username';
import { ethRegex } from '@/constants/wallet';
import { UserIdentifierType } from '@/services/protocol/types';
import { PublicKey } from '@solana/web3.js';
import zod, { ZodType } from 'zod';

const fallbackSchema = zod.object({
  type: zod.nativeEnum(UserIdentifierType),
  value: zod.string(),
});

const value = zod
  .string({ required_error: 'Address is required' })
  .min(2, 'The field must contain at least 2 character(s)');

const identifierValueSchema: ZodType<zod.infer<typeof fallbackSchema>> =
  zod.discriminatedUnion('type', [
    zod.object({
      type: zod.literal(UserIdentifierType.GatewayId),
      value: value.regex(RegExp(usernameRegex), {
        message: 'Only lowercase letters, numbers and ._-',
      }),
    }),
    zod.object({
      type: zod.literal(UserIdentifierType.Email),
      value: value.email(),
    }),
    zod.object({
      type: zod.literal(UserIdentifierType.Evm),
      value: value.regex(RegExp(ethRegex), {
        message: 'Invalid EVM Wallet',
      }),
    }),
    zod.object({
      type: zod.literal(UserIdentifierType.Solana),
      value: zod
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
