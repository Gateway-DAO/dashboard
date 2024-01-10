import { TextStatusChip } from '@/components/text-status-chip/text-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import { transaction_detail } from '@/locale/en/transaction';
import {
  ProofStatus,
  Transaction_DetailQuery,
} from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import dayjs from 'dayjs';

import { Divider, Stack, Typography } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function ProofCreation({
  data,
}: {
  data: Transaction_DetailQuery['transaction'];
}) {
  const metadata: any = data.metadata;
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
      <CardRow title={transaction_detail.proof_id}>{metadata.proof}</CardRow>
      <CardRow title={transaction_detail.owner}>
        <UserColumn isLoading={false} user={data.from} />
      </CardRow>
      {/* TODO: Check why API is not delivering this field */}
      {/* <CardRow title={transaction_detail.verifier}>
        <UserColumn isLoading={false} user={data.to} />
      </CardRow> */}
      {metadata?.proofRequest && (
        <CardRow title={transaction_detail.request_id}>
          {metadata?.proofRequest}
        </CardRow>
      )}
      <CardRow title={transaction_detail.created_at}>
        {dayjs(data.createdAt).format(DATE_FORMAT)}
      </CardRow>
      <CardRow title={transaction_detail.cost}>
        <Typography variant="subtitle1">
          {numberToMoneyString(data.cost as number)}
          <Typography color="text.secondary">
            {/* here is the fee  */}
            {numberToMoneyString(metadata?.fees)} Transaction fee
          </Typography>
          <Typography color="text.secondary">
            {numberToMoneyString(metadata?.earnings)} PDA consumption revenue
          </Typography>
        </Typography>
      </CardRow>
      <CardRow title={transaction_detail.status}>
        <TextStatusChip status={metadata?.status as ProofStatus} size="small" />
      </CardRow>
    </Stack>
  );
}
