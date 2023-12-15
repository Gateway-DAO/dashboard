import { usernameSchema } from '@/schemas/profile';
import zod from 'zod';

export const updateUsernameSchema = zod.object({
  username: usernameSchema,
});

export type UpdateUsernameSchema = zod.infer<typeof updateUsernameSchema>;
