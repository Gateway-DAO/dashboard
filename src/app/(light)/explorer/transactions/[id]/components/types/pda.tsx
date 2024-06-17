import ExternalLink from '@/components/external-link/external-link';
import { TextStatusChip } from '@/components/text-status-chip/text-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { transaction_detail } from '@/locale/en/transaction';
import { ActivityQuery, PdaStatus } from '@/services/protocol-v3/types';
import dayjs from 'dayjs';

import { Divider, Stack } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function PDA({ data }: { data: ActivityQuery['activity'] }) {
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
      <CardRow title={transaction_detail.pda_id}>{metadata.pda}</CardRow>
      <CardRow title={transaction_detail.issuer}>
        <UserColumn isLoading={false} did={metadata?.issuer as string} />
      </CardRow>

      <CardRow title={transaction_detail.data_model_id}>
        {metadata.dataModel}
        <ExternalLink
          iconSxProps={{ fontSize: 20, color: 'text.primary' }}
          href={routes.explorer.dataModel(metadata.dataModel) as string}
          text=""
        />
      </CardRow>
      <CardRow title={transaction_detail.expiration}>
        {metadata.expirationDate
          ? dayjs(metadata.expirationDate).format(DATE_FORMAT)
          : 'Indeterminate'}
      </CardRow>
      <CardRow title={transaction_detail.signed_by}>
        <UserColumn isLoading={false} did={metadata?.signedBy as string} />
      </CardRow>
      <CardRow title={transaction_detail.status}>
        <TextStatusChip
          variant="filled"
          status={metadata.status as PdaStatus}
          size="small"
        />
      </CardRow>
    </Stack>
  );
}
