import { Stack, Typography } from '@mui/material';

import TransactionsTable from './transactions-table';

const mock = [
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVs',
    amount: -0.01,
    type: 'EXPENSE',
    action: 'CREATE_PROOF',
    date: '2023-10-10T18:51:29.941Z',
    object_id: '123',
    metadata: {
      name: 'Request cost',
    },
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVt',
    amount: 0.5,
    type: 'EARNING',
    date: '2023-10-10T18:51:29.941Z',
    action: 'CREATE_PDA',
    object_id: '456',
    metadata: {
      name: 'PDA consumption revenue',
    },
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVa',
    amount: -1500,
    type: 'WITHDRAWAL',
    action: 'CREATE_PDA',
    date: '2023-10-10T18:51:29.941Z',
    object_id: '789',
    metadata: {
      name: 'Money withdraw',
    },
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVl',
    amount: 250,
    type: 'DEPOSIT',
    action: 'CREATE_PROOF',
    object_id: '764',
    date: '2023-10-10T18:51:29.941Z',
    metadata: {
      name: 'Deposit',
    },
  },
];

export default function TransactionsSection() {
  return (
    <Stack p={5} width="100%">
      <Typography variant="h5">Transactions</Typography>
      <TransactionsTable totalCount={9} initialData={mock} />
    </Stack>
  );
}
