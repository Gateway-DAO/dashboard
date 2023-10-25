'use client';

import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import { DATE_FORMAT } from '@/constants/date';
import { numberToMoneyString } from '@/utils/money';
import dayjs from 'dayjs';

import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

type Props = {
  initialData: any; //partialDeep somethig
  totalCount: number;
};

const columns: GridColDef<any>[] = [
  {
    field: 'amount',
    headerName: 'Amount',
    renderCell: (params) => (
      <Typography variant="body1">
        {numberToMoneyString(params.value)}
      </Typography>
    ),
  },
  {
    field: 'metadata',
    headerName: 'Detail',
    valueGetter: (params) => params.value.name,
  },
  {
    field: 'id',
    headerName: 'Transaction ID',
  },
  {
    field: 'metadata',
    headerName: 'Date',
    valueFormatter: (params) =>
      params.value.date ? dayjs(params.value.date).format(DATE_FORMAT) : '',
  },
  //   {
  //     field: 'type',
  //     headerName: 'Tye',
  //   },
];

export default function TransactionsTable({
  initialData,
  totalCount = 0,
}: Props) {
  const data: any = []; //usequery
  const isLoading = false; //usequery
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
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
        //   toggleDetailModal(true);
        //   setCurrentDataModel(params.id as string);
      }}
      onPaginationModelChange={setNewPage}
      paginationMode="server"
      loading={isLoading}
      rowCount={totalCount}
      sx={defaultGridCustomization}
    />
  );
}
