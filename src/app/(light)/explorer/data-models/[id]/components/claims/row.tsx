import ChipInputType from '@/components/chip-input-type/chip-input-type';
import getClaimType, { ClaimFieldProps } from '@/utils/get-claim-type';
import { titleCase } from 'title-case';

import { TableRow, TableCell, Typography } from '@mui/material';

export default function Row({
  id,
  property,
}: {
  id?: string;
  property: ClaimFieldProps;
}) {
  let title = property.title;
  if (!title && id) {
    title = titleCase(id);
  }

  let example: string | undefined = undefined;
  if (property.examples?.length) {
    example = property.examples!.join(', ');
  } else if (property.items?.examples?.length) {
    example = property.items.examples!.join(', ');
  }

  const defaultValue = property.default ?? property.items?.default;

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
