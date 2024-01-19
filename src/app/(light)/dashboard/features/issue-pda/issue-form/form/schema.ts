import { REQUIRED_MAX_LENGTH, REQUIRED_MIN_LENGTH } from '@/constants/zod';
import identifierValueSchema from '@/schemas/identifier-value';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import zod from 'zod';

dayjs.extend(utc);

export const issuePdaSchema = zod.object({
  title: zod
    .string()
    .trim()
    .min(2, REQUIRED_MIN_LENGTH(2))
    .max(100, REQUIRED_MAX_LENGTH(100)),
  description: zod.string().trim().min(2, REQUIRED_MIN_LENGTH(2)),
  claim: zod.object({}),
  owner: identifierValueSchema,
});

export type IssuePdaSchema = zod.infer<typeof issuePdaSchema>;
