import ExternalLink from '@/components/external-link/external-link';
import RequestStatusChip from '@/components/requests/request-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { transaction_detail } from '@/locale/en/transaction';
import { ActivityQuery } from '@/services/protocol-v3/types';
import dayjs from 'dayjs';

import { Divider, Stack } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function RequestCreation({
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
      <CardRow title={transaction_detail.request_id}>
        {metadata?.request}
      </CardRow>
      <CardRow title={transaction_detail.owner}>
        <UserColumn isLoading={false} did={metadata.owner} />
      </CardRow>
      <CardRow title={transaction_detail.verifier}>
        <UserColumn isLoading={false} did={metadata.verifier} />
      </CardRow>
      <CardRow title={transaction_detail.created_at}>
        {dayjs(data?.createdAt).format(DATE_FORMAT)}
      </CardRow>
      <CardRow title={transaction_detail.status}>
        <RequestStatusChip
          variant="filled"
          status={metadata.dataRequestStatus}
        />
      </CardRow>
    </Stack>
  );
}
