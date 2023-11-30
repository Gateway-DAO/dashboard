import CardCell from '@/components/card-cell/card-cell';
import { pda as pdaLocale } from '@/locale/en/pda';
import { CredentialData } from '@/services/protocol/types';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';
import getClaimType, { ClaimField } from '@/utils/get-claim-type';

import { Stack, Typography, Divider, Card } from '@mui/material';

import { CurrencyView } from './currency-view';
import { ImageView } from './image-view';
import { LinkView } from './link-view';
import { ListView } from './list-view';

type Props = {
  title: string;
  data: CredentialData[] | undefined;
};

function ClaimView(fieldData: CredentialData) {
  const type = getClaimType({
    type: fieldData.type,
    contentMediaType: fieldData.metadata?.contentMediaType,
    currency: fieldData.metadata?.currency,
    format: fieldData.metadata?.format,
  });

  if (!fieldData.value || fieldData.value === '')
    return <span>{pdaLocale.unfilled}</span>;
  switch (type) {
    case ClaimField.Image:
      return <ImageView src={fieldData?.value} alt={fieldData?.label} />;
    case ClaimField.Array:
      return <ListView value={fieldData?.value} />;
    case ClaimField.Link:
      return <LinkView href={fieldData?.value} />;
    case ClaimField.Currency:
      return (
        <CurrencyView
          currency={fieldData?.metadata?.currency}
          value={parseFloat(fieldData?.value) as number}
        />
      );
    case ClaimField.Text:
      return <span style={{ whiteSpace: 'normal' }}>{fieldData.value}</span>;
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
