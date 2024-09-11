'use client';

import { Divider, Stack } from '@mui/material';

import EVMButton from './evm-button';
import SolanaButton from './sol-button';
import { SignButtonsProps } from './types';

export default function SignButtons(props: SignButtonsProps) {
  return (
    <Stack
      gap={{
        xs: 6,
        lg: 2,
      }}
    >
      <EVMButton {...props} />
      <SolanaButton {...props} />
    </Stack>
  );
}
