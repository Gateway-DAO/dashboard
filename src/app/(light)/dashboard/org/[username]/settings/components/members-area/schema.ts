import identifierValueSchema from '@/schemas/identifier-value';
import { OrganizationRole } from '@/services/protocol/types';
import zod from 'zod';

export const schema = identifierValueSchema.and(
  zod.object({
    role: zod.enum([OrganizationRole.Admin, OrganizationRole.Member]),
  })
);

export type Schema = zod.infer<typeof schema>;
