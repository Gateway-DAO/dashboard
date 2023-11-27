import { titleCase } from 'title-case';

export enum ClaimField {
  Boolean = 'boolean',
  Image = 'image',
  Text = 'text',
  Number = 'number',
  Array = 'array',
  Link = 'link',
  Currency = 'currency',
}

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
  currency?: string | null;
};

export const getClaimType = ({
  type,
  contentMediaType,
  currency,
  format,
}: SchemaProperty): ClaimField => {
  if (contentMediaType) return ClaimField.Image;
  if (format === 'uri') return ClaimField.Link;
  if (currency) return ClaimField.Currency;

  switch (type) {
    case 'number':
    case 'integer':
    case 'float':
      return ClaimField.Number;
    case 'boolean':
      return ClaimField.Boolean;
    case 'array':
      return ClaimField.Array;
    default:
      return ClaimField.Text;
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
