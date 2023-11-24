import identifierValueSchema from '@/schemas/identifier-value';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResolverResult } from 'react-hook-form';
import zod from 'zod';

const issuePdaSchema = zod.object({
  title: zod.string().min(2).max(100),
  description: zod.string().min(2),
  claim: zod.object({}),
  owner: identifierValueSchema,
});

export type IssuePdaSchema = zod.infer<typeof issuePdaSchema>;

export const issuePdaValidator = async (
  values: IssuePdaSchema,
  schema: any,
  context: any,
  formsOptions: any
): Promise<ResolverResult<IssuePdaSchema>> => {
  const { claim, ...data } = values;

  const zodResult = await zodResolver(issuePdaSchema.omit({ claim: true }))(
    data,
    context,
    formsOptions
  );
  const claimResult = await ajvResolver(
    schema,
    { allErrors: true },
    { mode: 'sync' }
  )(claim, context, formsOptions);

  return {
    values: {
      ...zodResult.values,
      claim: claimResult.values,
    },
    errors: {
      ...zodResult.errors,
      ...(Object.keys(claimResult.errors).length > 0 && {
        claim: claimResult.errors as any,
      }),
    },
  };
};
