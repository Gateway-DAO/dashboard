'use client';
import { Typography } from '@mui/material';

type Props = {
  value: number;
  currency: string;
};

export function CurrencyView({ value = 0, currency = 'USD' }: Props) {
  return (
    <Typography>
      {currency}{' '}
      {`${value.toLocaleString('en-US', {
        style: 'currency',
        currency,
        currencyDisplay: 'symbol',
      })}`}
    </Typography>
  );
}
