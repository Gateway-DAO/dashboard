import { transaction } from '@/locale/en/transaction';
import { getPrivateApi } from '@/services/protocol/api';
import { My_TransactionsQuery } from '@/services/protocol/types';

import { Stack, Typography } from '@mui/material';

import TransactionsTable from './transactions-table';

export default async function TransactionsSection() {
  const privateApi = await getPrivateApi();
  const transactions = (await privateApi.my_transactions({ take: 10, skip: 0 }))
    ?.myFinancialTransactions as My_TransactionsQuery['myFinancialTransactions'];
  const totalCount = await (
    await privateApi.my_transactions_count()
  ).myFinancialTransactionsCount;
  return (
    <Stack p={5} width="100%">
      <Typography variant="h5">{transaction.title}</Typography>
      <TransactionsTable totalCount={totalCount} initialData={transactions} />
    </Stack>
  );
}
