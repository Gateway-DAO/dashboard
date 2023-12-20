import { titleCase } from 'title-case';

export enum ClaimField {
  Boolean = 'boolean',
  Image = 'image',
  Text = 'text',
  Number = 'number',
  Array = 'array',
  Link = 'link',
  Currency = 'currency',
  Unknown = 'unknown',
  SchemaError = 'schema_error',
  Select = 'select',
  Date = 'date',
  DateTime = 'datetime',
  Time = 'time',
}

// JSON Schema draft 7 property types and validations
export type SchemaProperty = {
  label?: string;
  fieldName?: string;
  title?: string;
  default?: string;
  type: string;
  contentMediaType?: string;
  format?: string;
  subType?: string;
  examples?: Array<string | boolean>;
  currency?: string | null;
  metadata?: any;
  description?: string;
  required?: boolean;

  // Number validations
  minimum?: number;
  maximum?: number;
  multipleOf?: number;

  // String validations
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  enum?: string[];

  // Array validations
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  items?: SchemaProperty;
};

const getClaimType = ({
  type,
  contentMediaType,
  currency,
  format,
  enum: enumValues,
}: SchemaProperty): ClaimField => {
  if (contentMediaType) return ClaimField.Image;
  if (currency) return ClaimField.Currency;
  if (enumValues) return ClaimField.Select;

  switch (format) {
    case 'date':
      return ClaimField.Date;
    case 'date-time':
      return ClaimField.DateTime;
    case 'time':
      return ClaimField.Time;
    case 'uri':
      return ClaimField.Link;
    default:
      break;
  }

  switch (type) {
    case 'number':
    case 'integer':
    case 'float':
      return ClaimField.Number;
    case 'boolean':
      return ClaimField.Boolean;
    case 'array':
      return ClaimField.Array;
    case 'string':
      return ClaimField.Text;
    default:
      return ClaimField.Unknown;
  }
};

export default getClaimType;

export const getClaimTitle = (property: SchemaProperty, id?: string) => {
  let title = property.title;
  if (!title && id) {
    title = titleCase(id);
  }

  return title;
};

export const getClaimExample = (property: SchemaProperty) => {
  let example: string | undefined = undefined;
  if (property.examples?.length) {
    example = property.examples!.join(', ');
  } else if (property.items?.examples?.length) {
    example = property.items.examples!.join(', ');
  }
  return example;
};

export const getClaimDefaultValue = (property: SchemaProperty) =>
  property.default ?? property.items?.default;
