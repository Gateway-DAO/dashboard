import { REQUIRED_MAX_LENGTH, REQUIRED_MIN_LENGTH } from '@/constants/zod';
import identifierValueSchema from '@/schemas/identifier-value';
import getClaimType, {
  ClaimField,
  SchemaProperty,
  getClaimDefaultValue,
} from '@/utils/get-claim-type';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { fullFormats } from 'ajv-formats/dist/formats';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ResolverResult } from 'react-hook-form';
import zod from 'zod';

dayjs.extend(utc);

const issuePdaSchema = zod.object({
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

export const issuePdaValidator = async (
  values: IssuePdaSchema,
  schema: any,
  context: any,
  formsOptions: any
): Promise<ResolverResult<IssuePdaSchema>> => {
  const { claim: oldClaim, ...data } = values;

  // Validate all values except 'claim'
  const zodResult = await zodResolver(issuePdaSchema.omit({ claim: true }))(
    data,
    context,
    formsOptions
  );

  const claim = { ...oldClaim };

  Object.keys(claim as any).forEach((key) => {
    // Set all values from object 'claim' that are empty strings to undefined
    const type = getClaimType(schema.properties[key]);

    // Trim string
    if (type === ClaimField.Text && typeof (claim as any)[key] === 'string') {
      const value = (claim as any)[key].trim();
      (claim as any)[key] = value.length > 0 ? value : undefined;
    }

    // Treat string as float
    if (type === ClaimField.Number) {
      const value = (claim as any)[key];
      (claim as any)[key] = parseFloat(value);
    }

    // Treat datetime as UTC ISO string
    if (type === ClaimField.DateTime) {
      const value = (claim as any)[key] as Dayjs;
      (claim as any)[key] = value.utc(true).toISOString();
    }

    // Treat date as UTC ISO string
    if (type === ClaimField.Date) {
      const value = (claim as any)[key] as Dayjs;
      (claim as any)[key] = value.utc(true).format('YYYY-MM-DD');
    }

    // Treat time as UTC ISO string
    if (type === ClaimField.Time) {
      const value = (claim as any)[key] as Dayjs;
      (claim as any)[key] = value.utc(true).format('hh:mm');
    }
  });

  const claimResult = await ajvResolver(
    schema,
    {
      allErrors: true,
      formats: fullFormats,
    },
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
    const property = schema.properties[key] as SchemaProperty;
    const type = getClaimType(property);
    const defaultValue = getClaimDefaultValue(property);
    if (typeof defaultValue !== 'undefined') {
      (acc as any)[key] = defaultValue;
    } else if (type === ClaimField.Array) {
      const subtype = property.items
        ? getClaimType(property.items)
        : ClaimField.Text;
      (acc as any)[key] = Array(property.minItems || 1).fill('');
      if (subtype === ClaimField.Number) {
        (acc as any)[key] = (acc as any)[key].map(
          (v: string, index: number) => ({
            id: index,
            value: '',
          })
        );
      }
    }
    return acc;
  }, {} as IssuePdaSchema);
};
