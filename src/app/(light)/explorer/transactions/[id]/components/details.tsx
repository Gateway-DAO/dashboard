'use client';
import React from 'react';

import ExternalLink from '@/components/external-link/external-link';
import { explorerQueries } from '@/constants/queries';
import { transaction_detail } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol/api';
import {
  TransactionAction,
  Transaction_DetailQuery,
} from '@/services/protocol/types';
import { useQuery } from '@tanstack/react-query';

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
import TransactionData from './transaction-data';
import OrgCreation from './types/org-creation';
import PDA from './types/pda';
import RequestCreation from './types/request-creation';
import RequestTemplateCreation from './types/request-template-creation';
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

  const { data: transactionData } = useQuery({
    queryKey: [explorerQueries.transaction_arweave, data?.arweaveUrl],
    queryFn: async () => {
      const response = await fetch(data?.arweaveUrl as string);
      if (!response.ok) {
        throw new Error('Network error to get arweave data');
      }

      return response.json();
    },
    enabled: !!data?.arweaveUrl,
  });

  const displayDetails = (data: Transaction_DetailQuery['transaction']) => {
    switch (data.action) {
      case TransactionAction.UserCreate:
        return <UserCreation data={data} />;
      case TransactionAction.OrganizationCreate:
        return <OrgCreation data={data} />;
      case TransactionAction.OrganizationUpdate:
        return <OrgCreation data={data} />;
      case TransactionAction.PdaIssuance:
        return <PDA data={data} />;
      case TransactionAction.PdaUpdate:
        return <PDA data={data} />;
      case TransactionAction.PdaStatusChange:
        return <PDA data={data} />;
      case TransactionAction.RequestCreate:
        return <RequestCreation data={data} />;
      case TransactionAction.RequestStatusChange:
        return <RequestCreation data={data} />;
      case TransactionAction.RequestTemplateCreate:
        return <RequestTemplateCreation data={data} />;
      // case TransactionAction.DatamodelCreate:
      //   return transaction_actions.data_model;
      // case TransactionAction.ProofCreate:
      //   return transaction_actions.proof_create;
      // case TransactionAction.ProofStatusChange:
      //   return transaction_actions.proof_status_change;
      // case TransactionAction.MoneyDeposit:
      //   return transaction_actions.money_deposit;
      // case TransactionAction.IssuerEarnings:
      //   return transaction_actions.issuers_earnings;
      // default:
      //   return action;
    }
  };

  return (
    <>
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
          </Stack>
        </Box>
      </Container>
      {transactionData && (
        <TransactionData data={JSON.stringify(transactionData)} />
      )}
    </>
  );
}
