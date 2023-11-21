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
import { apiPublic } from '@/services/protocol/api';
import { Explorer_TransactionsQuery } from '@/services/protocol/types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Chip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import ActionDetail from '../../components/transactions/action-detail';

type Props = {
  initialData: Explorer_TransactionsQuery['transactions'];
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
    field: 'action',
    headerName: transaction.type,
    flex: 1,
    renderCell: (params) => (
      <Chip label={<ActionDetail action={params.value} />} />
    ),
  },
  {
    field: 'createdAt',
    headerName: transaction.date,
    flex: 1.5,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format(DATE_FORMAT) : '',
  },
];

export default function TransactionsTable({ initialData, totalCount }: Props) {
  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      explorerQueries.transactions,
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 20,
    ],
    queryFn: () =>
      apiPublic.explorer_transactions({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
      }),
    select: (data: Explorer_TransactionsQuery) => data.transactions,
    initialData: initialData,
  });

  const setNewPage = ({ page }: { page: number }) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page ? page : 0,
    }));
  };

  return (
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
  );
}
