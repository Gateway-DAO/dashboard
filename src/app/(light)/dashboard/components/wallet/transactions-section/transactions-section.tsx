import { transaction } from '@/locale/en/transaction';

import { Stack, Typography } from '@mui/material';

import TransactionsTable from './transactions-table';

export default async function TransactionsSection() {
  return (
    <Stack p={5} width="100%">
      <Typography variant="h5">{transaction.title}</Typography>
      <TransactionsTable />
    </Stack>
  );
}
