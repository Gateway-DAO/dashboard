import { Stack, Typography } from '@mui/material';

import TransactionsTable from './transactions-table';

const mock = [
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVs',
    amount: -0.01,
    type: 'EXPENSE',
    metadata: {
      name: 'Request cost',
      date: '2023-10-10T18:51:29.941Z',
    },
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVt',
    amount: 0.5,
    type: 'EARNING',
    metadata: {
      name: 'PDA consumption revenue',
      date: '2023-10-10T18:51:29.941Z',
    },
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVa',
    amount: -1500,
    type: 'WITHDRAWAL',
    metadata: {
      name: 'Money withdraw',
      date: '2023-10-10T18:51:29.941Z',
    },
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVl',
    amount: 250,
    type: 'DEPOSIT',
    metadata: {
      name: 'Deposit',
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
