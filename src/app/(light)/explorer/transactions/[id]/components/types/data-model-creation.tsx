import ExternalLink from '@/components/external-link/external-link';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { transaction_detail } from '@/locale/en/transaction';
import { ActivityQuery } from '@/services/protocol-v3/types';
import dayjs from 'dayjs';

import { Divider, Stack } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function DataModelCreation({
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
      <CardRow title={transaction_detail.data_model_id}>
        {metadata.dataModelId}
        <ExternalLink
          iconSxProps={{ fontSize: 20, color: 'text.primary' }}
          href={routes.explorer.dataModel(metadata.dataModel as string)}
          text=""
        />
      </CardRow>
      <CardRow title={transaction_detail.creator}>
        <UserColumn isLoading={false} did={metadata.creator} />
      </CardRow>
      <CardRow title={transaction_detail.signed_by}>
        <UserColumn isLoading={false} did={metadata.signedBy} />
      </CardRow>
      <CardRow title={transaction_detail.created_at}>
        {dayjs(data.createdAt).format(DATE_FORMAT)}
      </CardRow>
    </Stack>
  );
}
