'use client';

import { transaction } from '@/locale/en/transaction';

import { Stack, Typography, alpha } from '@mui/material';

type Props = {
  value: number;
};

export default function TransactionCardTitle({ value }: Props) {
  return (
    <Stack
      sx={{
        borderRadius: 1,
        mb: 3,
        px: 2,
        py: 2,
        backgroundColor: (theme) => alpha(theme.palette.success.light, 0.4),
      }}
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      gap={1.5}
    >
      <Typography variant="caption" color="text.secondary">
        {transaction.detail_modal.total_amount}
      </Typography>
      <Typography variant="h3" id="total-amount-value">
        {value
          ? value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'symbol',
            })
          : '$0.00'}
      </Typography>
    </Stack>
  );
}
