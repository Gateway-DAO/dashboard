import CardCell from '@/components/card-cell/card-cell';
import { ClaimArray } from '@/utils/data-model';

import { Stack, Divider, Card } from '@mui/material';

type Props = {
  data: ClaimArray;
};

export default function MetaDataDetails({ data }: Props) {
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
          <Stack direction="row" justifyContent="space-between">
            <CardCell label={'Last Modified'} margin={false} py={3}>
              <span>test</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label={'Expiration'} margin={false} py={3}>
              <span>test</span>
            </CardCell>
          </Stack>
          <CardCell label={'Created At'} margin={false} py={3}>
            <span>test</span>
          </CardCell>
        </Stack>
      </Stack>
      <Stack
        component={Card}
        variant="outlined"
        sx={{
          width: '100%',
          mt: 1,
        }}
      >
        <Stack divider={<Divider />} sx={{}}>
          <Stack direction="row" justifyContent="space-between">
            <CardCell label={'Size'} margin={false} py={3}>
              <span>test</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label={'Type'} margin={false} py={3}>
              <span>test</span>
            </CardCell>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <CardCell label={'Tags'} margin={false} py={3}>
              <span>test</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label={'Data model ID'} margin={false} py={3}>
              <span>test</span>
            </CardCell>
          </Stack>
          <CardCell label={'Data asset ID'} margin={false} py={3}>
            <span>test</span>
          </CardCell>
        </Stack>
      </Stack>
    </Stack>
  );
}
