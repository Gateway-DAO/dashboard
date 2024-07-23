import { usernameRegex } from '@/constants/username';
import { auth } from '@/locale/en/auth';
import { PublicKey } from '@solana/web3.js';
import zod, { ZodType } from 'zod';

export enum UserIdentifierType {
  GatewayId = 'GatewayId',
  Email = 'Email',
  Solana = 'Solana',
}

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
        message: auth.steps.choose_gateway_id.create_username_rules,
      }),
    }),
    zod.object({
      type: zod.literal(UserIdentifierType.Email),
      value: value.email(),
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
