import { useMemo } from 'react';

import ChipInputType from '@/components/chip-input-type/chip-input-type';
import getClaimType, {
  ClaimField,
  getClaimExample,
  getClaimTitle,
} from '@/utils/get-claim-type';

import { Stack, Typography } from '@mui/material';

import PropertyItem from './property-item';
import { PropertyProps } from './type';

export default function Property({ id, property, required }: PropertyProps) {
  const title = getClaimTitle(property, id);
  const example = getClaimExample(property);
  const type = getClaimType(property);

  const titleText = (
    <Typography variant="subtitle1">
      {required ? title : `${title} (optional)`}
    </Typography>
  );

  const field = useMemo(
    () => <PropertyItem id={id} property={property} type={type} />,
    [type]
  );

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
