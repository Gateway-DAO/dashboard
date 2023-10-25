'use client';
import CardCell from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import ExternalLink from '@/components/external-link/external-link';
import TransactionStatusChip from '@/components/transaction-status-chip/transaction-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import { common } from '@/locale/en/common';
import { transaction } from '@/locale/en/transaction';
import dayjs from 'dayjs';

import { Stack, Divider, Card, Typography, Button } from '@mui/material';

export default function TransactionCardInfo() {
  const data = {
    title: 'PDA consumption revenue',
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVs',
    date: '2023-10-25T10:58:14Z',
    type: 'earning',
  };
  return (
    <Stack
      component={Card}
      variant="outlined"
      sx={{
        mb: 3,
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <TableCellContainer>
        <CardCell label={transaction.detail_modal.detail}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography>{data.title}</Typography>
            <Button size="small" sx={{ marginTop: -2 }}>
              {common.actions.view_pda}
            </Button>
          </Stack>
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={transaction.detail_modal.transaction_id}>
          <ExternalLink href="#" text={data.id} size="big" id={data.id} />
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={transaction.detail_modal.date}>
          {data.date ? dayjs(data.date).format(DATE_FORMAT) : ''}
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={transaction.detail_modal.type}>
          <TransactionStatusChip status="earning" />
        </CardCell>
      </TableCellContainer>
    </Stack>
  );
}
