import ChipInputType from '@/components/chip-input-type/chip-input-type';
import getClaimType, {
  SchemaProperty,
  getClaimDefaultValue,
  getClaimExample,
  getClaimTitle,
} from '@/utils/get-claim-type';

import { TableRow, TableCell, Typography } from '@mui/material';

export default function Row({
  id,
  property,
}: {
  id?: string;
  property: SchemaProperty;
}) {
  const title = getClaimTitle(property, id);
  const example = getClaimExample(property);
  const defaultValue = getClaimDefaultValue(property);

  const hasDescription = !!example || !!defaultValue;

  return (
    <TableRow key={property.title}>
      <TableCell
        scope="row"
        sx={
          hasDescription
            ? {
                display: 'flex',
                flexDirection: 'column',
                gap: 0.2,
              }
            : undefined
        }
      >
        {hasDescription ? <Typography>{title}</Typography> : title}
        {!!example && (
          <Typography variant="caption" color="text.secondary">
            Eg. {example}
          </Typography>
        )}
        {defaultValue && (
          <Typography variant="caption" color="text.secondary">
            Default: {defaultValue}
          </Typography>
        )}
      </TableCell>
      <TableCell align="right" sx={{ gap: 3 }}>
        {property.items?.type && (
          <ChipInputType
            type={getClaimType({
              type: property.items.type,
              contentMediaType: property.items.contentMediaType,
              format: property.items.format,
            })}
            sx={{ mr: 1 }}
          />
        )}
        <ChipInputType
          type={getClaimType({
            type: property.type,
            contentMediaType: property.contentMediaType,
            format: property.format,
          })}
        />
      </TableCell>
    </TableRow>
  );
}
