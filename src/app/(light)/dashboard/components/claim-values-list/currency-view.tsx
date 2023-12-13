'use client';
import { numberToMoneyString } from '@/utils/money';

import { Typography } from '@mui/material';

type Props = {
  value: number;
  currency: string;
};

export function CurrencyView({ value = 0, currency = 'USD' }: Props) {
  return (
    <Typography>
      {currency} {numberToMoneyString(value)}
    </Typography>
  );
}
