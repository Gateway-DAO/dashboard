import { useMemo } from 'react';

import ChipInputType from '@/components/chip-input-type/chip-input-type';
import getClaimType, {
  ClaimField,
  SchemaProperty,
  getClaimDefaultValue,
  getClaimExample,
  getClaimTitle,
} from '@/utils/get-claim-type';

import { Stack, Typography } from '@mui/material';

import ArrayProperty from './fields/array';
import BooleanProperty from './fields/boolean';
import CurrencyProperty from './fields/currency';
import NumberProperty from './fields/number';
import TextProperty from './fields/text';
import UnknownProperty from './fields/unknown';

export default function Property({
  id,
  property,
  required,
}: {
  id: string;
  property: SchemaProperty;
  required?: boolean;
}) {
  const title = getClaimTitle(property, id);
  const example = getClaimExample(property);
  const type = getClaimType(property);

  const titleText = (
    <Typography variant="subtitle1">
      {required ? title : `${title} (optional)`}
    </Typography>
  );

  const field = useMemo(() => {
    switch (type) {
      case ClaimField.Image:
      case ClaimField.Text:
        return <TextProperty id={id} {...property} />;
      case ClaimField.Boolean:
        return <BooleanProperty id={id} {...property} />;
      case ClaimField.Number:
        return <NumberProperty id={id} {...property} />;
      case ClaimField.Array:
        return (
          <ArrayProperty
            id={id}
            {...property}
            subType={property?.items?.type}
          />
        );
      case ClaimField.Currency:
        return <CurrencyProperty id={id} {...property} />;
      case ClaimField.Unknown:
        return <UnknownProperty id={id} {...property} />;
      default:
        return null;
    }
  }, [type]);

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1.5}
      >
        {!!example ? (
          <Stack>
            {titleText}
            <Typography variant="caption" color="text.secondary">
              Eg. {example}
            </Typography>
          </Stack>
        ) : (
          titleText
        )}
        {type === ClaimField.Array && property.items ? (
          <Stack direction="row" alignItems="center" gap={1}>
            <ChipInputType type={type} />
            <ChipInputType
              type={getClaimType({
                type: property.items.type,
                contentMediaType: property.items.contentMediaType,
                format: property.items.format,
              })}
            />
          </Stack>
        ) : (
          <ChipInputType type={type} />
        )}
      </Stack>
      {field}
    </div>
  );
}
