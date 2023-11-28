'use client';

import { useMemo } from 'react';

import {
  financial_transaction_actions,
  transaction,
} from '@/locale/en/transaction';
import {
  FinancialTransactionAction,
  FinancialTransactionType,
} from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';

import { Box, Stack, Typography, alpha } from '@mui/material';

type Props = {
  amount: number;
  type: FinancialTransactionType;
  action: FinancialTransactionAction;
  fee?: number;
  value?: number;
};

export default function TransactionCardTitle({
  amount,
  type,
  action,
  fee,
  value,
}: Props) {
  const bgColor = useMemo(() => {
    if (
      type === FinancialTransactionType.Expense ||
      type === FinancialTransactionType.Withdraw
    ) {
      return 'error';
    }
    return 'success';
  }, [type]);
  return (
    <Stack
      sx={{
        borderRadius: 1,
        mb: 3,
        px: 2,
        py: 2,
        backgroundColor: (theme) => alpha(theme.palette[bgColor].light, 0.4),
      }}
    >
      <Stack
        data-testid="transaction__title"
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        gap={1.5}
      >
        <Typography variant="caption" color="text.secondary">
          {transaction.total_amount}
        </Typography>
        <Typography
          variant="h3"
          id="total-amount-value"
          data-testid="transaction__title__amount"
        >
          {numberToMoneyString(amount)}
        </Typography>
      </Stack>
      {type === FinancialTransactionType.Earning &&
        action === FinancialTransactionAction.IssuerEarnings && (
          <Box mt={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="caption" color="text.secondary">
                Transaction fee
              </Typography>
              <Typography variant="body1">
                {numberToMoneyString(fee ?? 0)}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="caption" color="text.secondary">
                {financial_transaction_actions.in.pda_revenue}
              </Typography>
              <Typography variant="body1">
                {numberToMoneyString(value ?? 0)}
              </Typography>
            </Box>
          </Box>
        )}
    </Stack>
  );
}
