import { ClaimField } from '@/utils/get-claim-type';
import { PartialDeep } from 'type-fest';

import { PropertyField } from './type';

type PartialProperty = PartialDeep<PropertyField>;

export const getStringHelperText = ({
  description,
  minLength,
  maxLength,
  pattern,
}: PartialProperty) =>
  (
    [
      typeof description !== 'undefined' && description,
      typeof minLength !== 'undefined' && `Minimum length: ${minLength}`,
      typeof maxLength !== 'undefined' && `Maximum length: ${maxLength}`,
      typeof pattern !== 'undefined' && `Pattern: ${pattern}`,
    ].filter(Boolean) as string[]
  ).join(', ');

export const getNumberHelperText = ({
  description,
  maximum,
  minimum,
  multipleOf,
}: PartialProperty) =>
  (
    [
      typeof description !== 'undefined' && description,
      typeof minimum !== 'undefined' && `Minimum number: ${minimum}`,
      typeof maximum !== 'undefined' && `Maximum number: ${maximum}`,
      typeof multipleOf !== 'undefined' && `Number multiple of: ${multipleOf}`,
    ].filter(Boolean) as string[]
  ).join(', ');

export const getArrayHelperText = ({
  description,
  minItems,
  maxItems,
  uniqueItems,
}: PartialProperty) =>
  (
    [
      typeof description !== 'undefined' && description,
      typeof minItems !== 'undefined' && `Minimum items: ${minItems}`,
      typeof maxItems !== 'undefined' && `Maximum items: ${maxItems}`,
      typeof uniqueItems !== 'undefined' && `Unique items: ${uniqueItems}`,
    ].filter(Boolean) as string[]
  ).join(', ');

export const getClaimHelperText = (
  type: ClaimField,
  property?: PartialProperty
) => {
  switch (type) {
    case ClaimField.Text:
      return getStringHelperText(property ?? {});
    case ClaimField.Number:
      return getNumberHelperText(property ?? {});
    case ClaimField.Array:
      return getArrayHelperText(property ?? {});
    default:
      return undefined;
  }
};
