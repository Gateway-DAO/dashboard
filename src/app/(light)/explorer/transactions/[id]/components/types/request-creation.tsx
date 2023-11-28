import ExternalLink from '@/components/external-link/external-link';
import RequestStatusChip from '@/components/requests/request-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { transaction, transaction_detail } from '@/locale/en/transaction';
import { Transaction_DetailQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import dayjs from 'dayjs';

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
        <Typography variant="body1">{data.metadata?.request}</Typography>
      </CardRow>
      <CardRow title={transaction_detail.owner}>
        <UserColumn isLoading={false} user={data.to} />
      </CardRow>
      <CardRow title={transaction_detail.verifier}>
        <UserColumn isLoading={false} user={data.from} />
      </CardRow>
      <CardRow title={transaction_detail.request_template}>
        <Typography variant="body1">
          {data.metadata?.requestTemplate}
        </Typography>
        <ExternalLink
          iconSxProps={{ fontSize: 20, color: 'text.primary' }}
          href={routes.explorer.requestTemplate(
            data.metadata.requestTemplate as string
          )}
          text=""
        />
      </CardRow>
      <CardRow title={transaction_detail.created_at}>
        <Typography variant="body1">
          {dayjs(data?.createdAt).format(DATE_FORMAT)}
        </Typography>
      </CardRow>
      <CardRow title={transaction_detail.cost}>
        <Typography variant="body1">
          {numberToMoneyString(data.cost as number)}
        </Typography>
      </CardRow>
      <CardRow title={transaction_detail.status}>
        <RequestStatusChip variant="filled" status={data.metadata.status} />
      </CardRow>
    </Stack>
  );
}
