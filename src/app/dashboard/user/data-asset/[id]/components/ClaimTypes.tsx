type ClaimTypes = {
  [x: string]: string;
};

export type ClaimFieldProps = {
  label: string;
  fieldName: string;
  type: string;
  contentMediaType?: string;
  format?: string;
  subType?: string;
};

// List all claim fields
export const claimFields: ClaimTypes = {
  image: 'image',
  text: 'text',
  number: 'number',
  array: 'array',
  link: 'link',
  currency: 'currency',
};

// List all backend Types
export const mapBackendTypes: Record<string, string> = {
  integer: claimFields.number,
  float: claimFields.number,
  string: claimFields.text,
};

export const getClaimType = (
  backendType: string,
  contentMediaType: string,
  format: string,
  currency: string
) => {
  if (contentMediaType) return claimFields.image;
  if (format === 'uri') return claimFields.link;
  if (currency) return claimFields.currency;
  if (mapBackendTypes[backendType]) {
    backendType = mapBackendTypes[backendType];
  }
  return claimFields[backendType];
};
