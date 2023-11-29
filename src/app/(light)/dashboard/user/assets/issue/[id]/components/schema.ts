import identifierValueSchema from '@/schemas/identifier-value';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResolverResult } from 'react-hook-form';
import zod from 'zod';

const issuePdaSchema = zod.object({
  title: zod.string().min(2).max(100),
  description: zod.string().min(2),
  claim: zod.object({}),
  // TODO: Remove this line when refactoring the owner field ((light)\dashboard\user\assets\issue\[id]\components\sections\owner\owner.tsx)
  ownerDraft: identifierValueSchema.optional(),
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

  // Set all values from object 'claim' that are empty strings to undefined
  Object.keys(claim as any).forEach((key) => {
    if ((claim as any)[key] === '') {
      (claim as any)[key] = undefined;
    }
  });

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
