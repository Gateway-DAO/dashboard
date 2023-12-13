import CardCell from '@/components/card-cell/card-cell';
import { PdaClaim } from '@/services/protocol/types';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';

import { Stack, Typography, Divider, Card } from '@mui/material';

import ClaimView from './claim-view';

type Props = {
  title: string;
  data: PdaClaim[] | undefined;
};

export default function ClaimValuesList({ title, data }: Props) {
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
                label={fieldData?.property ?? fieldData?.label}
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
