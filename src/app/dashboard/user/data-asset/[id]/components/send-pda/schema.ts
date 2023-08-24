import { z } from 'zod';

export type SendPdaSchema = {
  id: string;
  title?: string;
  image?: string;
};

export const sendPdaSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(2, 'The title must contain at least 2 character(s)'),
  image: z.string().nullish(),
});
