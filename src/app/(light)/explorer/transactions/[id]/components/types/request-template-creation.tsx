import ExternalLink from '@/components/external-link/external-link';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { transaction_detail } from '@/locale/en/transaction';
import { Transaction_DetailQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import dayjs from 'dayjs';

import { Box, Divider, Stack } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function RequestTemplateCreation({
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
      <CardRow title={transaction_detail.request_template}>
        {data.metadata.requestTemplate}
        <ExternalLink
          iconSxProps={{ fontSize: 20, color: 'text.primary' }}
          href={routes.explorer.requestTemplate(
            data.metadata.requestTemplate as string
          )}
          text=""
        />
      </CardRow>
      <CardRow title={transaction_detail.creator}>
        <UserColumn isLoading={false} user={data.from} />
      </CardRow>
      {/* <CardRow title={transaction_detail.signed_by}>
        <UserColumn isLoading={false} user={data.to} />
      </CardRow> */}
      <CardRow title={transaction_detail.created_at}>
        {dayjs(data.createdAt).format(DATE_FORMAT)}
      </CardRow>
      <CardRow title={transaction_detail.cost}>
        {numberToMoneyString(data.cost as number)}
      </CardRow>
      <CardRow title={transaction_detail.data_models}>
        {data.metadata.dataModels.map((item: string, index: number) => (
          <Box key={index} display="flex">
            {item}
            <ExternalLink
              iconSxProps={{ fontSize: 20, color: 'text.primary' }}
              href={routes.explorer.dataModel(item as string)}
              text=""
            />
          </Box>
        ))}
      </CardRow>
    </Stack>
  );
}
