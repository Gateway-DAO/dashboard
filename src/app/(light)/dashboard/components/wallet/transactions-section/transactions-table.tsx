'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import { DATE_FORMAT } from '@/constants/date';
import { queries } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { transaction } from '@/locale/en/transaction';
import { My_TransactionsQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { useToggle } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import { TransactionModal } from '../transaction/transaction-modal';
import TransactionStatusChip from '../transaction/transaction-status-chip';

type Props = {
  initialData: My_TransactionsQuery['myFinancialTransactions'];
  totalCount: number;
};

const columns: GridColDef<My_TransactionsQuery['myFinancialTransactions']>[] = [
  {
    field: 'value',
    headerName: transaction.amount,
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body1" fontWeight={700}>
        {numberToMoneyString(params.value)}
      </Typography>
    ),
  },
  {
    field: 'action',
    headerName: transaction.detail,
    flex: 1,
    valueFormatter: (params) => params.value.name,
  },
  {
    field: 'id',
    flex: 1,
    headerName: transaction.transaction_id,
  },
  {
    field: 'createdAt',
    headerName: transaction.date,
    flex: 1,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format(DATE_FORMAT) : '',
  },
  {
    field: 'type',
    headerName: transaction.type,
    flex: 1,
    renderCell: (params) => (
      <TransactionStatusChip variant="outlined" status={params.value} />
    ),
  },
];

export default function TransactionsTable({ totalCount = 0 }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const { organization } = useOrganization();
  const { privateApi } = useGtwSession();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      queries.my_transactions,
      organization ? organization.id : session?.user.id,
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 10,
    ],
    queryFn: () =>
      privateApi?.my_transactions({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
      }),
    select: (data: My_TransactionsQuery) => data.myFinancialTransactions,
  });

  const [showTransactionDetail, toggleTransaction] = useToggle(false);
  const [currentTransaction, setCurrentTransaction] = useState({});

  const toggleTransactionModal = (value: boolean) => {
    if (!value) {
      toggleTransaction(value);
      router.push('', { scroll: false });
    } else {
      toggleTransaction(value);
      router.push('#transaction', { scroll: false });
    }
  };

  const setNewPage = ({ page }: { page: number }) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page ? page : 0,
    }));
  };

  return (
    <>
      <DataGrid
        {...defaultGridConfiguration}
        rows={data && data.length ? data : []}
        columns={columns}
        paginationModel={paginationModel}
        onRowClick={(params: GridRowParams) => {
          toggleTransactionModal(true);
          setCurrentTransaction(params.row);
        }}
        onPaginationModelChange={setNewPage}
        paginationMode="server"
        loading={isLoading}
        rowCount={totalCount}
        sx={defaultGridCustomization}
      />
      <TransactionModal
        open={showTransactionDetail}
        transactionDetail={currentTransaction}
        onClose={() => toggleTransactionModal(false)}
      />
    </>
  );
}
