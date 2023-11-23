import identifierValueSchema from '@/schemas/identifier-value';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { fullFormats } from 'ajv-formats/dist/formats';
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

  console.log('values', values);
  console.log('schema', schema);

  const zodResult = await zodResolver(issuePdaSchema.omit({ claim: true }))(
    data,
    context,
    formsOptions
  );
  const claimResult = await ajvResolver(schema, {
    formats: fullFormats,
  })(claim, context, formsOptions);

  console.log('zodResult', zodResult);
  console.log('claimResult', claimResult);

  return {
    values: {
      ...zodResult.values,
      claim: claimResult.values,
    },
    errors: {
      ...zodResult.errors,
      claim: claimResult.errors as any,
    },
  };
};
