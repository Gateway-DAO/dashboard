import CardCell from '@/components/card-cell/card-cell';
import { PdaClaim } from '@/services/protocol/types';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';

import { Stack, Typography, Divider, Card } from '@mui/material';

import ClaimView from './claim-view';

type Props = {
  data: PdaClaim[] | undefined;
};

export default function ClaimValuesList({ data }: Props) {
  return (
    <Stack sx={{ ...WIDTH_CENTERED, mt: 2 }}>
      <Stack
        component={Card}
        variant="outlined"
        sx={{
          mb: 2,
          width: '100%',
          height: '75%',
          overflowY: 'scroll',
        }}
      >
        <Stack divider={<Divider />} sx={{}}>
          {data?.map((fieldData: any, index: number) => (
            <Stack key={index} direction="row" justifyContent="space-between">
              <CardCell
                label={
                  fieldData?.label ?? fieldData?.title ?? fieldData?.property
                }
                margin={false}
                py={3}
                disabled={
                  fieldData.value === undefined ||
                  fieldData.value === null ||
                  fieldData.value === ''
                }
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
