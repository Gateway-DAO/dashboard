import { DATE_FORMAT } from '@/constants/date';
import { transaction_detail } from '@/locale/en/transaction';
import { Transaction_DetailQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import dayjs from 'dayjs';

import { Divider, Stack, Typography } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function PDA({
  data,
}: {
  data: Transaction_DetailQuery['transaction'];
}) {
  return (
    <Stack
      sx={{
        mb: 3,
        overflow: 'visible',
      }}
      divider={
        <Divider
          sx={{
            width: '100%',
          }}
        />
      }
    >
      <CardRow title={transaction_detail.pda_id}>
        <Typography variant="body1">id</Typography>
      </CardRow>
      <CardRow title={transaction_detail.issuer}>
        <UserColumn isLoading={false} user={data.from} />
      </CardRow>
      <CardRow title={transaction_detail.signed_by}>
        <UserColumn isLoading={false} user={data.to} />
      </CardRow>
      <CardRow title={transaction_detail.data_model_id}>
        <Typography variant="body1">data model id</Typography>
      </CardRow>
      <CardRow title={transaction_detail.created_at}>
        <Typography variant="body1">
          {dayjs(data?.createdAt).format(DATE_FORMAT)}
        </Typography>
      </CardRow>
      <CardRow title={transaction_detail.cost}>
        {numberToMoneyString(data?.cost ?? 0)}
      </CardRow>
    </Stack>
  );
}
