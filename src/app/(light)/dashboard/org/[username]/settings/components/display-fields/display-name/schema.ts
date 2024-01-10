import { displayNameSchema } from '@/schemas/profile';
import zod from 'zod';

export const updateDisplayNameSchema = zod.object({
  displayName: displayNameSchema,
});

export type UpdateDisplayNameSchema = zod.infer<typeof updateDisplayNameSchema>;
