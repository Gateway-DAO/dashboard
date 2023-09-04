import CardCell from '@/components/card-cell/card-cell';
import { pda as pdaLocale } from '@/locale/en/pda';
import { CredentialData } from '@/services/protocol/types';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Typography, Divider, Card } from '@mui/material';

import { claimFields, getClaimType } from './ClaimTypes';
import { CurrencyView } from './currency-view';
import { ImageView } from './image-view';
import { LinkView } from './link-view';
import { ListView } from './list-view';

type Props = {
  title: string;
  data: CredentialData[] | undefined;
};

function ClaimView(fieldData: CredentialData) {
  const type = getClaimType(
    fieldData.type,
    fieldData.metadata?.contentMediaType,
    fieldData.metadata?.format,
    fieldData.metadata?.currency
  );

  if (!fieldData.value || fieldData.value === '')
    return <span>{pdaLocale.unfilled}</span>;
  switch (type) {
    case claimFields.image:
      return <ImageView src={fieldData?.value} alt={fieldData?.label} />;
    case claimFields.array:
      return <ListView value={fieldData?.value} />;
    case claimFields.link:
      return <LinkView href={fieldData?.value} />;
    case claimFields.currency:
      return (
        <CurrencyView
          currency={fieldData?.metadata?.currency}
          value={parseFloat(fieldData?.value) as number}
        />
      );
    default: {
      return <span>{fieldData.value}</span>;
    }
  }
}

export default function DataTable({ title, data }: Props) {
  return (
    <Stack sx={{ ...WIDTH_CENTERED }}>
      <Typography sx={{ fontWeight: 700, mb: 3 }}>{title}</Typography>
      <Stack
        component={Card}
        variant="outlined"
        sx={{
          mb: 2,
          width: '100%',
        }}
      >
        <Stack divider={<Divider />}>
          {data?.map((fieldData: any, index: number) => (
            <Stack key={index} direction="row" justifyContent="space-between">
              <CardCell
                label={fieldData?.label}
                margin={false}
                py={3}
                disabled={!fieldData.value || fieldData.value === ''}
              >
                <ClaimView {...fieldData} />
              </CardCell>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
