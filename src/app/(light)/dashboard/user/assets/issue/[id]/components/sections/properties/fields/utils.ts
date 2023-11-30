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
      typeof minimum !== 'undefined' && `Minimum: ${minimum}`,
      typeof maximum !== 'undefined' && `Maximum: ${maximum}`,
      typeof multipleOf !== 'undefined' && `Multiple of: ${multipleOf}`,
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
