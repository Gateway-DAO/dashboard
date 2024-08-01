import CardCell from '@/components/card-cell/card-cell';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';
import { ClaimArray } from '@/utils/data-model';

import { Stack, Divider, Card } from '@mui/material';

import ClaimView from './claim-view';

type Props = {
  data: ClaimArray;
};

export default function ClaimValuesList({ data }: Props) {
  return (
    <Stack>
      <Stack
        component={Card}
        variant="outlined"
        sx={{
          width: '100%',
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
