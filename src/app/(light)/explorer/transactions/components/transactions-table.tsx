'use client';

import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { transaction } from '@/locale/en/transaction';
import dayjs from 'dayjs';

import { Chip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

type Props = {
  initialData: any[];
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
    field: 'type',
    headerName: transaction.type,
    flex: 1,
    renderCell: (params) => <Chip label={params.value} />,
  },
  {
    field: 'date',
    headerName: transaction.date,
    flex: 1.5,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format(DATE_FORMAT) : '',
  },
];

export default function TransactionsTable({ initialData, totalCount }: Props) {
  const router = useRouter();

  const data: any = []; //usequery
  const isLoading = false; //usequery
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
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
