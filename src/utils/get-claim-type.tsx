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

export type ClaimFieldProps = {
  label?: string;
  fieldName?: string;
  title?: string;
  default?: string;
  type: string;
  contentMediaType?: string;
  format?: string;
  subType?: string;
  examples?: Array<string | boolean>;
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
