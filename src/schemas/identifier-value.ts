import { usernameRegex, didRegex } from '@/constants/identity';
import { auth } from '@/locale/en/auth';
import { UserIdentifierType } from '@/services/protocol-v3/types';
import zod, { ZodType } from 'zod';

const fallbackSchema = zod.object({
  type: zod.nativeEnum(UserIdentifierType),
  value: zod.string(),
});

const identifierValueSchema: ZodType<zod.infer<typeof fallbackSchema>> =
  zod.discriminatedUnion('type', [
    zod.object({
      type: zod.literal(UserIdentifierType.Username),
      value: zod
        .string({ required_error: 'Username is required' })
        .min(2, 'The field must contain at least 2 character(s)')
        .regex(RegExp(usernameRegex), {
          message: auth.steps.choose_gateway_id.create_username_rules,
        }),
    }),
    zod.object({
      type: zod.literal(UserIdentifierType.UserDid),
      value: zod
        .string({ required_error: 'DID is Required' })
        .min(2, 'The field must contain at least 2 character(s)')
        .regex(RegExp(didRegex), {
          message: 'Invalid DID',
        }),
    }),
  ]);

export type IdentifierValueSchema = zod.infer<typeof identifierValueSchema>;

export default identifierValueSchema;
