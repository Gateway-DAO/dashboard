'use client';

import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import { DATE_FORMAT } from '@/constants/date';
import { numberToMoneyString } from '@/utils/money';
import { useToggle } from '@react-hookz/web';
import dayjs from 'dayjs';

import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import { TransactionModal } from '../transaction/transaction-modal';
import TransactionStatusChip from '../transaction/transaction-status-chip';
import { transaction } from '@/locale/en/transaction';
import { useRouter } from 'next-nprogress-bar';
import routes from '@/constants/routes';

type Props = {
  initialData: any; //partialDeep somethig
  totalCount: number;
};

const columns: GridColDef<any>[] = [
  {
    field: 'amount',
    headerName: transaction.amount,
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body1" fontWeight={700}>
        {numberToMoneyString(params.value)}
      </Typography>
    ),
  },
  {
    field: 'metadata',
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
    field: 'date',
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

export default function TransactionsTable({
  initialData,
  totalCount = 0,
}: Props) {
  const router = useRouter();

  const data: any = []; //usequery
  const isLoading = false; //usequery
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [showTransactionDetail, toggleTransaction] = useToggle(false);
  const [currentTransaction, setCurrentTransaction] = useState({});

  const toggleTransactionModal = (value: boolean) => {
    if (!value) {
      toggleTransaction(value);
      router.push(routes.dashboardUserWallet, { scroll: false });
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
        rows={data && data.length ? data : initialData}
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
