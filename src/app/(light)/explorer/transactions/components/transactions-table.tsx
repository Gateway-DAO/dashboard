'use client';

import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import { DATE_FORMAT } from '@/constants/date';
import { explorerQueries } from '@/constants/queries';
import routes from '@/constants/routes';
import { transaction } from '@/locale/en/transaction';
import { apiPublic } from '@/services/protocol-v3/api';
import { Explorer_TransactionsQuery } from '@/services/protocol-v3/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import Search from './search';

type Props = {
  initialData: Explorer_TransactionsQuery['activities'];
  totalCount: number;
};

const columns: GridColDef<any>[] = [
  {
    field: 'id',
    flex: 3,
    headerName: transaction.transaction_id,
    renderCell: (params) => (
      <Typography variant="body1" fontWeight={700}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'createdAt',
    headerName: transaction.date,
    flex: 0.5,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format(DATE_FORMAT) : '',
  },
];

export default function TransactionsTable({ initialData, totalCount }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      explorerQueries.transactions,
      paginationModel.page,
      paginationModel.pageSize,
    ],
    queryFn: () =>
      apiPublic.explorer_transactions({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
      }),
    select: (data: Explorer_TransactionsQuery) => data.activities,
  });

  const setNewPage = ({ page }: { page: number }) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page ? page : 0,
    }));
  };

  const refreshList = () => {
    queryClient.invalidateQueries([explorerQueries.transactions_stats]);
    setNewPage({ page: 0 });
    refetch();
  };

  return (
    <>
      <Search refreshAction={refreshList} totalTransactions={totalCount} />
      <DataGrid
        {...defaultGridConfiguration}
        rows={data && data.length ? data : initialData}
        columns={columns}
        paginationModel={paginationModel}
        onRowClick={(params: GridRowParams) => {
          router.push(routes.explorer.transaction(params.id));
        }}
        onPaginationModelChange={setNewPage}
        paginationMode="server"
        loading={isLoading}
        rowCount={totalCount}
        sx={{ marginTop: 3, ...defaultGridCustomization }}
      />
    </>
  );
}
