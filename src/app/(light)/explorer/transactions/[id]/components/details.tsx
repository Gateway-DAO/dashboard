'use client';
import React from 'react';

import ExternalLink from '@/components/external-link/external-link';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { DATE_FORMAT } from '@/constants/date';
import { explorerQueries } from '@/constants/queries';
import { transaction_detail } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol/api';
import { TransactionAction } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

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

type Props = {
  id: string;
};

type User = {
  id: string;
  gatewayId?: string;
  name?: string;
  image?: string;
};

type UserColum = {
  isLoading: boolean;
  user: User | { id: string; type: string } | undefined;
};

const UserColumn = ({ user, isLoading = true }: UserColum) => {
  return (
    <Stack direction="row" gap={1.5} alignItems="center">
      {isLoading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <GTWAvatar name={user?.id} src={user?.image} />
      )}
      <Box>
        <Typography variant="subtitle1" lineHeight={1}>
          {isLoading ? (
            <Skeleton width={200} />
          ) : (
            user?.name ?? user?.gatewayId ?? user?.id
          )}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {isLoading ? (
            <Skeleton width={100} />
          ) : user?.name ? (
            `@${user?.gatewayId}`
          ) : (
            ''
          )}
        </Typography>
      </Box>
    </Stack>
  );
};

export default function TransactionDetails({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [explorerQueries.transaction, id],
    queryFn: () => apiPublic.transaction_detail({ id }),
    select: (data) => data.transaction,
  });

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
          {/* <CardRow title={transaction_detail.pda_id}>
            <Typography variant="body1">
              {isLoading ? (
                <Skeleton variant="text" width={300} />
              ) : (
                data?.pda_id
              )}
            </Typography>
          </CardRow> */}
          <CardRow title={transaction_detail.issuer}>
            <UserColumn user={data?.from} isLoading={isLoading} />
          </CardRow>
          <CardRow title={transaction_detail.signed_by}>
            <UserColumn user={data?.to} isLoading={isLoading} />
          </CardRow>
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
          <CardRow title={transaction_detail.created_at}>
            <Typography variant="body1">
              {isLoading ? (
                <Skeleton variant="text" width={200} />
              ) : (
                dayjs(data?.createdAt).format(DATE_FORMAT)
              )}
            </Typography>
          </CardRow>
          <CardRow title={transaction_detail.cost}>
            {isLoading ? (
              <Skeleton variant="text" width={100} />
            ) : (
              numberToMoneyString(data?.cost ?? 0)
            )}
          </CardRow>
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
