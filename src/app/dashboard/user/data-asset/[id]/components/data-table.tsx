import CardCell from '@/components/card-cell/card-cell';
import { pda as pdaLocale } from '@/locale/en/pda';
import { CredentialData } from '@/services/protocol/types';

import { Stack, Typography, Divider } from '@mui/material';

import { claimFields, getClaimType } from './ClaimTypes';
import { ImageView } from './image-view';
import { LinkView } from './link-view';
import { ListView } from './list-view';

type Props = {
  title: string;
  data: CredentialData[];
};

function ClaimView(fieldData: CredentialData) {
  const type = getClaimType(
    fieldData.type,
    fieldData.metadata?.contentMediaType,
    fieldData.metadata?.format
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
    default:
      return <span>{fieldData.value}</span>;
  }
}

export default function DataTable({ title, data }: Props) {
  return (
    <Stack
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 2,
        backgroundColor: 'common.white',
        maxWidth: 550,
        mx: 'auto',
      }}
    >
      <Typography sx={{ px: 2, pt: 2, fontWeight: 700 }}>{title}</Typography>
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
  );
}
