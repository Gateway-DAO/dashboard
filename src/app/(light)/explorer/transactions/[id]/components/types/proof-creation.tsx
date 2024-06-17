import { TextStatusChip } from '@/components/text-status-chip/text-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import { transaction_detail } from '@/locale/en/transaction';
import { ProofStatus, ActivityQuery } from '@/services/protocol-v3/types';
import dayjs from 'dayjs';

import { Divider, Stack } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function ProofCreation({
  data,
}: {
  data: ActivityQuery['activity'];
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
        <UserColumn isLoading={false} did={metadata.owner as string} />
      </CardRow>
      <CardRow title={transaction_detail.verifier}>
        <UserColumn isLoading={false} did={metadata.verifier as string} />
      </CardRow>
      {metadata?.proofRequest && (
        <CardRow title={transaction_detail.request_id}>
          {metadata?.proofRequest}
        </CardRow>
      )}
      <CardRow title={transaction_detail.created_at}>
        {dayjs(data.createdAt).format(DATE_FORMAT)}
      </CardRow>
      <CardRow title={transaction_detail.status}>
        <TextStatusChip
          status={metadata?.proofStatus as ProofStatus}
          size="small"
        />
      </CardRow>
    </Stack>
  );
}
