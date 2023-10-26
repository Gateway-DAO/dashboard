'use client';
import { useMemo } from 'react';

import TransactionStatusChip from '@/app/(light)/dashboard/components/wallet/transaction/components/transaction-status-chip';
import CardCell from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import ExternalLink from '@/components/external-link/external-link';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';
import { transaction } from '@/locale/en/transaction';
import dayjs from 'dayjs';

import { Stack, Divider, Card, Typography, Button } from '@mui/material';

type Props = {
  id: string;
  title: string;
  date: string;
  type: string;
  action: string;
  objectId: string;
};

export default function TransactionCardInfo({
  title,
  id,
  date,
  type,
  action,
  objectId,
}: Props) {
  const { organization } = useOrganization();

  const dynamicRoute = useMemo(() => {
    if (action === 'CREATE_PROOF') {
      const obj = {
        text: common.actions.view_proof,
        url: '',
      };
      obj.url = !!organization
        ? routes.dashboardOrgProof(organization.gatewayId, objectId)
        : routes.dashboardUserProof(objectId);
      return obj;
    }
    if (action === 'CREATE_PDA') {
      const obj = {
        text: common.actions.view_pda,
        url: '',
      };
      obj.url = !!organization
        ? routes.dashboardOrgAsset(organization.gatewayId, objectId)
        : routes.dashboardUserAsset(objectId);
      return obj;
    }
  }, [action]);
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
        <CardCell label={transaction.detail}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography>{title}</Typography>
            <Button
              size="small"
              sx={{ marginTop: -2 }}
              href={dynamicRoute?.url}
            >
              {dynamicRoute?.text}
            </Button>
          </Stack>
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={transaction.transaction_id}>
          <ExternalLink href="#" text={id} size="big" id={id} />
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={transaction.date}>
          {date ? dayjs(date).format(DATE_FORMAT) : ''}
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label="Type">
          <TransactionStatusChip status={type as any} />
        </CardCell>
      </TableCellContainer>
    </Stack>
  );
}
