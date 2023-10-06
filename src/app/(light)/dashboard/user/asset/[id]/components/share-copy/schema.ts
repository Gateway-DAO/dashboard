import identifierValueSchema from '@/schemas/identifier-value';
import { FieldError } from 'react-hook-form';
import { z } from 'zod';

export type ShareCopySchemaError = {
  id?: FieldError;
  identifier_type?: FieldError;
  address?: FieldError;
  image?: FieldError;
};

const imageSchema = z.object({
  image: z.string().nullish(),
});

export const shareCopySchema = identifierValueSchema.and(imageSchema);

export type ShareCopySchema = z.infer<typeof shareCopySchema>;
