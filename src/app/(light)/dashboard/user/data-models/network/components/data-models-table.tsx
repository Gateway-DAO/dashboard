'use client';

import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import { DATE_FORMAT } from '@/constants/date';
import { useGtwSession } from '@/context/gtw-session-provider';
import { datamodel } from '@/locale/en/datamodel';
import { DataModel, DataModelsQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { limitCharsCentered } from '@/utils/string';
import { useToggle } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';

import ModalDetail from '../../components/modal-detail';

const columns: GridColDef<PartialDeep<DataModel>>[] = [
  {
    field: 'title',
    headerName: datamodel.title,
    flex: 1.2,
    valueFormatter: (params) => params.value,
    renderCell(params) {
      return <Typography fontWeight={700}>{params.value}</Typography>;
    },
  },
  {
    field: 'id',
    headerName: datamodel.data_model_id,
    flex: 1.3,
    renderCell: (params: GridRenderCellParams) => {
      return <Typography>{limitCharsCentered(params.row.id, 10)}</Typography>;
    },
  },
  {
    field: 'consumptionPrice',
    headerName: datamodel.consumption_cost,
    flex: 1.3,
    renderCell: (params) => {
      return <Typography>{numberToMoneyString(params.value)}</Typography>;
    },
  },
  {
    field: 'pdasIssuedCount',
    headerName: datamodel.issuances,
    flex: 1.3,
    renderCell: (params) => {
      return <Typography>{params.value}</Typography>;
    },
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1.2,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format(DATE_FORMAT) : '',
  },
];

type Props = {
  data: PartialDeep<DataModel>[];
  totalCount: number;
};

export default function DataModelsTable({
  data: initialData,
  totalCount = 0,
}: Props) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [openDetailModal, toggleDetailModal] = useToggle(false);
  const [currentDataModel, setCurrentDataModel] = useState('');

  const { privateApi } = useGtwSession();
  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      'network-data-models',
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
    ],
    queryFn: () =>
      privateApi?.dataModels({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
      }),
    select: (data: any) => (data as DataModelsQuery)?.dataModels,
    initialData: initialData && initialData.length ? initialData : null,
  });

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
        onPaginationModelChange={setNewPage}
        onRowClick={(params: GridRowParams) => {
          toggleDetailModal(true);
          setCurrentDataModel(params.id as string);
        }}
        paginationMode="server"
        loading={isLoading}
        rowCount={totalCount}
        sx={defaultGridCustomization}
      />
      <ModalDetail
        open={openDetailModal}
        onClose={toggleDetailModal}
        id={currentDataModel}
      />
    </>
  );
}
