import { REQUIRED_MAX_LENGTH, REQUIRED_MIN_LENGTH } from '@/constants/zod';
import identifierValueSchema from '@/schemas/identifier-value';
import getClaimType, {
  ClaimField,
  getClaimDefaultValue,
} from '@/utils/get-claim-type';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResolverResult } from 'react-hook-form';
import zod from 'zod';

const issuePdaSchema = zod.object({
  title: zod
    .string()
    .min(2, REQUIRED_MIN_LENGTH(2))
    .max(100, REQUIRED_MAX_LENGTH(100)),
  description: zod.string().min(2, REQUIRED_MIN_LENGTH(2)),
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

  // Validate all values except 'claim'
  const zodResult = await zodResolver(issuePdaSchema.omit({ claim: true }))(
    data,
    context,
    formsOptions
  );

  Object.keys(claim as any).forEach((key) => {
    // Set all values from object 'claim' that are empty strings to undefined
    if ((claim as any)[key] === '') {
      (claim as any)[key] = undefined;
      return;
    }
    const type = getClaimType(schema.properties[key]);
    // Treat string as float
    if (type === ClaimField.Number) {
      (claim as any)[key] = parseFloat((claim as any)[key]);
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

export const getSchemaDefaultValues = (schema: any) => {
  return Object.keys(schema.properties).reduce((acc, key) => {
    const property = schema.properties[key];
    const type = getClaimType(property);
    const defaultValue = getClaimDefaultValue(property);
    if (typeof defaultValue !== 'undefined') {
      (acc as any)[key] = defaultValue;
    } else if (type === ClaimField.Array) {
      (acc as any)[key] = Array(property.minItems || 1)
        .fill('')
        .map((v, index) => ({
          id: index,
          value: '',
        }));
    }
    return acc;
  }, {} as IssuePdaSchema);
};
