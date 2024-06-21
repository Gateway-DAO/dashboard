import { DATE_FORMAT } from '@/constants/date';
import { transaction_detail } from '@/locale/en/transaction';
import { ActivityQuery } from '@/services/protocol-v3/types';
import dayjs from 'dayjs';

import { Divider, Stack } from '@mui/material';

import CardRow from './card-row';
import UserColumn from './user-column';

export default function TransactionTemplate({
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
      <CardRow title={transaction_detail.source}>
        <UserColumn isLoading={false} did={data.source?.did as string} />
      </CardRow>
      {data.target?.did && (
        <CardRow title={transaction_detail.target}>
          <UserColumn isLoading={false} did={data.target?.did as string} />
        </CardRow>
      )}
      <CardRow title={transaction_detail.created_at}>
        {dayjs(data?.createdAt).format(DATE_FORMAT)}
      </CardRow>
      {metadata.signature || metadata.signedBy && (
        <CardRow title={transaction_detail.signed_by}>
          <UserColumn isLoading={false} did={metadata?.signedBy as string} />
        </CardRow>
      )}
    </Stack>
  );
}
