import { DATE_FORMAT } from '@/constants/date';
import dayjs from 'dayjs';

import { Divider, Stack, Typography } from '@mui/material';

import CardRow from '../card-row';
import { Transaction } from '@/services/api/mock-types';
import CopyData from '../copy-data';

export default function PDA({ data }: { data: Transaction }) {
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
      <CardRow title="Transaction ID">
        <CopyData text={data.transactionId} showWholeString={true} />
      </CardRow>
      <CardRow title="Solana txn ID">
        <CopyData text={data.solanaTransactionId} />
      </CardRow>
      <CardRow title="Source">
        <CopyData text={data.solanaTransactionId} />
      </CardRow>
      <CardRow title="Signature">
        <CopyData text={data.signature} />
      </CardRow>
      <CardRow title="Fee">
        <Stack direction={'row'}>
          <Typography>{data?.fee.solana}</Typography>
          <Typography>{data?.fee.gateway}</Typography>
        </Stack>
      </CardRow>

      <CardRow title="Created At">
        {dayjs(data.createdAt).format(DATE_FORMAT)}
      </CardRow>
    </Stack>
  );
}
