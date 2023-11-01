import { usernameSchema } from '@/schemas/profile';
import { string, z } from 'zod';

export const createOrganisationSchema = z.object({
  username: usernameSchema,
  name: string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }).min(2, 'The file title must contain at least 2 character(s)'),
  description: string({ required_error: 'description is required' })
    .min(2, 'The file description must contain at least 2 character(s)')
    .max(400),
  website: z.string().url().optional(),
});

export type CreateOrganisationSchema = z.infer<typeof createOrganisationSchema>;
