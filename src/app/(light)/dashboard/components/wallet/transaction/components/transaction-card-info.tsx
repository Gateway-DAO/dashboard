'use client';
import CardCell from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import ExternalLink from '@/components/external-link/external-link';
import TransactionStatusChip from '@/app/(light)/dashboard/components/wallet/transaction/components/transaction-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import { common } from '@/locale/en/common';
import { transaction } from '@/locale/en/transaction';
import dayjs from 'dayjs';

import { Stack, Divider, Card, Typography, Button } from '@mui/material';
import routes from '@/constants/routes';

type Props = {
  id: string;
  title: string;
  date: string;
  type: string;
  pdaId: string;
};

export default function TransactionCardInfo({
  title,
  id,
  date,
  type,
  pdaId,
}: Props) {
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
            <Typography>{title}</Typography>
            <Button
              size="small"
              sx={{ marginTop: -2 }}
              href={routes.dashboardUserAsset(pdaId)}
            >
              {common.actions.view_pda}
            </Button>
          </Stack>
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={transaction.detail_modal.transaction_id}>
          <ExternalLink href="#" text={id} size="big" id={id} />
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={transaction.detail_modal.date}>
          {date ? dayjs(date).format(DATE_FORMAT) : ''}
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={type}>
          <TransactionStatusChip status="earning" />
        </CardCell>
      </TableCellContainer>
    </Stack>
  );
}
