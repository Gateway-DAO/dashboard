import { titleCase } from 'title-case';
export const claimFields = {
  boolean: 'boolean',
  image: 'image',
  text: 'text',
  number: 'number',
  array: 'array',
  link: 'link',
  currency: 'currency',
};

export type ClaimField = keyof typeof claimFields;

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
  items?: SchemaProperty;
};

// List all claim fields

// List all backend Types
export const maptypes = {
  boolean: claimFields.boolean,
  integer: claimFields.number,
  float: claimFields.number,
  string: claimFields.text,
};

type type = keyof typeof maptypes;

type GetClaimTypeProps = {
  type: string;
  contentMediaType?: string | null;
  format?: string | null;
  currency?: string | null;
};

const getClaimType = ({
  type,
  contentMediaType,
  currency,
  format,
}: GetClaimTypeProps) => {
  if (contentMediaType) return claimFields.image;
  if (format === 'uri') return claimFields.link;
  if (currency) return claimFields.currency;
  if (maptypes[type as type]) {
    type = maptypes[type as type];
  }
  return claimFields[type as keyof typeof claimFields];
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
