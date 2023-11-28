import ClaimView from '@/app/(light)/dashboard/components/claim-view/claim-view';
import CardCell from '@/components/card-cell/card-cell';
import { CredentialData } from '@/services/protocol/types';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';

import { Stack, Typography, Divider, Card } from '@mui/material';

type Props = {
  data: CredentialData[] | undefined;
};

export default function ClaimList({ data }: Props) {
  return (
    <Stack sx={{ ...WIDTH_CENTERED }}>
      <Typography sx={{ fontWeight: 700, mb: 3 }}>Claims</Typography>
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
