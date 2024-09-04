import CopyData from '@/app/dashboard/components/copy/copy';
import CardCell from '@/components/card-cell/card-cell';
import Tags from '@/components/tags/tags';
import { DATE_FORMAT } from '@/constants/date';
import { PublicDataAsset } from '@/services/api/models';
import { formatBytes } from '@/utils/bytes';
import { formatDateDifference } from '@/utils/date';
import dayjs from 'dayjs';

import { Stack, Divider, Card, Typography } from '@mui/material';

type Props = {
  pda: PublicDataAsset;
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
        <Stack divider={<Divider />}>
          <Stack direction="row" justifyContent="space-between">
            <CardCell label="Last Modified" margin={false} py={3}>
              <span>{dayjs(pda.updated_at).format(DATE_FORMAT)}</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label="Expiration" margin={false} py={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <span>{formatDateDifference(pda.expiration_date)}</span>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {dayjs(pda.expiration_date).format(DATE_FORMAT)}
                </Typography>
              </Stack>
            </CardCell>
          </Stack>
          <CardCell label="Created At" margin={false} py={3}>
            <span>{dayjs(pda.created_at).format(DATE_FORMAT)}</span>
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
        <Stack divider={<Divider />}>
          <Stack direction="row" justifyContent="space-between">
            <CardCell label="Size" margin={false} py={3}>
              <span>{formatBytes(pda.size ?? 0)}</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label="Type" margin={false} py={3}>
              <span>{pda.type}</span>
            </CardCell>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <CardCell label="Tags" margin={false} py={3}>
              <span>{pda?.tags?.length && <Tags tags={pda?.tags} />}</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label="Data model ID" margin={false} py={3}>
              <CopyData text={pda.data_model_id?.toString() || ''} />
            </CardCell>
          </Stack>
          <CardCell label="Data asset ID" margin={false} py={3}>
            <CopyData text={pda.fid ?? ''} />
          </CardCell>
        </Stack>
      </Stack>
    </Stack>
  );
}
