'use client';

import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import { DATE_FORMAT } from '@/constants/date';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { datamodel } from '@/locale/en/datamodel';
import { DataModelsQuery, DataRequest } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const columns: GridColDef<PartialDeep<DataRequest>>[] = [
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
      return (
        <Typography variant="body1">
          {limitCharsCentered(params.row.id, 10)}
        </Typography>
      );
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
  data: PartialDeep<DataRequest>[];
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
  const { organization } = useOrganization();
  const { privateApi } = useGtwSession();
  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      'data-models',
      organization?.id as string,
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
    ],
    queryFn: () =>
      privateApi?.dataModelsByOrg({
        organizationId: organization?.id as string,
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
      }),
    select: (data: any) => (data as DataModelsQuery)?.dataModels,
    initialData: initialData && initialData.length ? initialData : null,
    enabled: !!organization,
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
      onPaginationModelChange={setNewPage}
      paginationMode="server"
      loading={isLoading}
      rowCount={totalCount}
      sx={defaultGridCustomization}
    />
  );
}
