import { Stack, Typography } from '@mui/material';

import TransactionsTable from './transactions-table';

const mock = [
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVs',
    amount: -123.45,
    metadata: {
      name: 'Request cost',
      date: '2023-10-10T18:51:29.941Z',
    },
  },
];

export default function TransactionsSection() {
  return (
    <Stack p={5}>
      <Typography variant="h5">Transactions</Typography>
      <TransactionsTable totalCount={9} initialData={mock} />
    </Stack>
  );
}
