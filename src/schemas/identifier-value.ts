import { usernameRegex } from '@/constants/username';
import { ethRegex } from '@/constants/wallet';
import { auth } from '@/locale/en/auth';
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
        message: auth.steps.choose_gateway_id.create_username_rules,
      }),
    }),
    zod.object({
      type: zod.literal(UserIdentifierType.Email),
      value: value.email(),
    }),
  ]);

export type IdentifierValueSchema = zod.infer<typeof identifierValueSchema>;

export default identifierValueSchema;
