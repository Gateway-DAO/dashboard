import CopyData from '@/app/(light)/dashboard/components/copy/copy';
import CardCell from '@/components/card-cell/card-cell';
import Tags from '@/components/tags/tags';
import { DATE_FORMAT } from '@/constants/date';
import { PrivateDataAsset } from '@/services/server/mock-types';
import { formatBytes } from '@/utils/bytes';
import { formatDateDifference } from '@/utils/date';

import { Stack, Divider, Card, Typography } from '@mui/material';
import dayjs from 'dayjs';

type Props = {
  pda: PrivateDataAsset;
};

export default function MetaDataDetails({ pda }: Props) {
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
              <span>{dayjs(pda.updatedAt).format(DATE_FORMAT)}</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label={'Expiration'} margin={false} py={3}>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems="baseline"
              >
                <span>{formatDateDifference(pda.expirationDate)}</span>
                <Typography variant="caption" color="text.secondary">
                  {dayjs(pda.expirationDate).format(DATE_FORMAT)}
                </Typography>
              </Stack>
            </CardCell>
          </Stack>
          <CardCell label={'Created At'} margin={false} py={3}>
            <span>{dayjs(pda.createdAt).format(DATE_FORMAT)}</span>
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
              <span>{formatBytes(pda.size)}</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label={'Type'} margin={false} py={3}>
              <span>
                {pda.structured ? 'Structured Data' : 'Unstructured Data'}
              </span>
            </CardCell>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <CardCell label={'Tags'} margin={false} py={3}>
              <span>{pda?.tags.length && <Tags tags={pda?.tags} />}</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label={'Data model ID'} margin={false} py={3}>
              <CopyData text={pda.dataModel?.id || ''} />
            </CardCell>
          </Stack>
          <CardCell label={'Data asset ID'} margin={false} py={3}>
            <CopyData text={String(pda.id)} />
          </CardCell>
        </Stack>
      </Stack>
    </Stack>
  );
}
