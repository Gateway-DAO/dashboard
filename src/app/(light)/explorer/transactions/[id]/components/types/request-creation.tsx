import { transaction_detail } from '@/locale/en/transaction';
import { Transaction_DetailQuery } from '@/services/protocol/types';

import { Divider, Stack, Typography } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function RequestCreation({
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
      <CardRow title={transaction_detail.request_id}>
        <Typography variant="body1">request id</Typography>
      </CardRow>
      <CardRow title={transaction_detail.owner}>
        <UserColumn isLoading={false} user={data.to} />
      </CardRow>
      {/* <CardRow title=''></CardRow> */}
    </Stack>
  );
}
