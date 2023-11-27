'use client';
import React from 'react';

import ExternalLink from '@/components/external-link/external-link';
// import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
// import { DATE_FORMAT } from '@/constants/date';
import { explorerQueries } from '@/constants/queries';
import { transaction_detail } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol/api';
import {
  TransactionAction,
  Transaction_DetailQuery,
} from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { useQuery } from '@tanstack/react-query';
// import dayjs from 'dayjs';

import {
  Box,
  Card,
  Chip,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import ActionDetail from '../../../components/transactions/action-detail';
import CardRow from './card-row';
import OrgCreation from './types/org-creation';
import PDA from './types/pda';
import RequestCreation from './types/request-creation';
import UserCreation from './types/user-creation';

type Props = {
  id: string;
};

export default function TransactionDetails({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transaction, id],
    queryFn: () => apiPublic.transaction_detail({ id }),
    select: (data) => data.transaction,
  });

  const displayDetails = (data: Transaction_DetailQuery['transaction']) => {
    switch (data.action) {
      case TransactionAction.UserCreate:
        return <UserCreation data={data} />;
      case TransactionAction.OrganizationCreate:
        return <OrgCreation data={data} />;
      case TransactionAction.PdaIssuance:
        return <PDA data={data} />;
      case TransactionAction.PdaUpdate:
        return <PDA data={data} />;
      case TransactionAction.PdaStatusChange:
        return <PDA data={data} />;
      case TransactionAction.RequestCreate:
        return <RequestCreation data={data} />;
      // case TransactionAction.PdaIssuance:
      //   return transaction_actions.pda_issuance;
      // case TransactionAction.PdaUpdate:
      //   return transaction_actions.pda_update;
      // case TransactionAction.PdaStatusChange:
      //   return transaction_actions.pda_status_change;
      // case TransactionAction.DatamodelCreate:
      //   return transaction_actions.data_model;
      // case TransactionAction.OrganizationCreate:
      //   return transaction_actions.org_create;
      // case TransactionAction.OrganizationUpdate:
      //   return transaction_actions.org_update;
      // case TransactionAction.ProofCreate:
      //   return transaction_actions.proof_create;
      // case TransactionAction.ProofStatusChange:
      //   return transaction_actions.proof_status_change;
      // case TransactionAction.RequestCreate:
      //   return transaction_actions.request_create;
      // case TransactionAction.RequestStatusChange:
      //   return transaction_actions.request_status_change;
      // case TransactionAction.RequestTemplateCreate:
      //   return transaction_actions.request_template;
      // case TransactionAction.MoneyDeposit:
      //   return transaction_actions.money_deposit;
      // case TransactionAction.IssuerEarnings:
      //   return transaction_actions.issuers_earnings;
      // default:
      //   return action;
    }
  };

  return (
    <Container sx={{ pb: 4 }}>
      <Box sx={{ maxWidth: 777 }}>
        <Stack
          component={Card}
          variant="outlined"
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
          <CardRow title={transaction_detail.transaction_id}>
            <Typography variant="body1">
              {isLoading ? <Skeleton variant="text" width={400} /> : id}
            </Typography>
            {data && (
              <ExternalLink
                iconSxProps={{ fontSize: 20, color: 'text.primary' }}
                href={data?.arweaveUrl as string}
                text=""
              />
            )}
          </CardRow>
          <CardRow title={transaction_detail.action}>
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Chip
                label={
                  <ActionDetail action={data?.action as TransactionAction} />
                }
              />
            )}
          </CardRow>
          {data && displayDetails(data)}
          {/* <CardRow title={transaction_detail.pda_id}>
            <Typography variant="body1">
              {isLoading ? (
                <Skeleton variant="text" width={300} />
              ) : (
                data?.pda_id
              )}
            </Typography>
          </CardRow> */}
          {/* <CardRow title={transaction_detail.issuer}>
            <UserColumn user={data?.from} isLoading={isLoading} />
          </CardRow>
          <CardRow title={transaction_detail.signed_by}>
            <UserColumn user={data?.to} isLoading={isLoading} />
          </CardRow> */}
          {/* <CardRow title={transaction_detail.data_model_id}>
            <Typography variant="body1">
              {isLoading ? (
                <Skeleton variant="text" width={400} />
              ) : (
                data?.data_model_id
              )}
            </Typography>
            {data && (
              <ExternalLink
                iconSxProps={{ fontSize: 20, color: 'text.primary' }}
                href={routes.explorer.dataModel(data.data_model_id)}
                text=""
              />
            )}
          </CardRow> */}

          {/* <CardRow title={transaction_detail.cost}>
            {isLoading ? (
              <Skeleton variant="text" width={100} />
            ) : (
              numberToMoneyString(data?.cost ?? 0)
            )}
          </CardRow> */}
          {/* <CardRow title={transaction_detail.status}>
            {isLoading ? (
              <Skeleton width={30} />
            ) : (
              <TextStatusChip status={data?.status as PdaStatus} />
            )}
          </CardRow> */}
        </Stack>
      </Box>
    </Container>
  );
}
