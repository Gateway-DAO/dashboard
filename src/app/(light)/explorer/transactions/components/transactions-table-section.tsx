import { Container, Stack } from '@mui/material';

import Search from './search';
import TransactionsTable from './transactions-table';

const dataMock = [
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVs',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVa',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVb',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVc',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVd',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVe',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVf',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVg',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVh',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVi',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVj',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVk',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVl',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVm',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVn',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVo',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVp',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVq',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVr',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVt',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
];

export default function TransactionsTableSection() {
  return (
    <Stack
      p={3}
      component={Container}
      maxWidth="xl"
      justifyContent="space-between"
    >
      <Search totalTransactions={8734782389} />
      <TransactionsTable initialData={dataMock} totalCount={20} />
    </Stack>
  );
}
