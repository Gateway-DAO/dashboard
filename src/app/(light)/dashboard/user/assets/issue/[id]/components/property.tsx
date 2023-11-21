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

import BooleanProperty from './fields/boolean';
import NumberProperty from './fields/number';
import TextProperty from './fields/text';

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
  const defaultValue = getClaimDefaultValue(property);
  const type = getClaimType(property);

  const titleText = (
    <Typography variant="subtitle1">
      {required ? title : `${title} (optional)`}
    </Typography>
  );

  const field = useMemo(() => {
    switch (type) {
      case ClaimField.Text:
        return <TextProperty id={id} />;
      case ClaimField.Boolean:
        return <BooleanProperty id={id} />;
      case ClaimField.Number:
        return <NumberProperty id={id} />;
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
        <ChipInputType type={type} />
      </Stack>
      {field}
    </div>
  );
}
