'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import RequestStatusChip from '@/components/requests/request-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { useSession } from '@/context/session-provider';
import { DataRequest } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { limitCharsCentered } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Stack, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';

const columns: GridColDef<PartialDeep<DataRequest>>[] = [
  {
    field: 'id',
    headerName: 'Request ID',
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
    field: 'userVerifier',
    headerName: 'Requested By',
    flex: 1.3,
    renderCell(params) {
      return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <GTWAvatar
            name={params.row.userVerifier!.gatewayId! || ''}
            size={32}
          />
          <Typography variant="body2">
            {params.row.userVerifier?.gatewayId}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'dataRequestTemplate',
    headerName: 'Request Template ID',
    flex: 1.2,
    valueGetter: (params) => params.row.dataRequestTemplate?.id,
    valueFormatter: (params) => limitCharsCentered(params.value, 15),
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1.2,
    valueFormatter: (params) => dayjs(params.value).format(DATE_FORMAT),
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1.2,
    renderCell(params) {
      return <RequestStatusChip status={params.row.status!} />;
    },
  },
];

type Props = {
  data: PartialDeep<DataRequest>[];
};

export default function RequestsTable({ data: initialData }: Props) {
  const router = useRouter();
  const rowCountState = 6; //TODO: REMOVE THIS MAGIC NUMBER
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { privateApi } = useSession();
  const { data, isFetching } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      'data-requests-received',
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
    ],
    queryFn: () =>
      privateApi?.myDataRequests({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
      }),
    select: (data: any) => data?.requestsReceived,
    initialData: initialData && initialData.length ? initialData : null,
  });

  const setNewPage = ({ page }: { page: number }) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page ? page : 0,
    }));
  };

  return (
    <DataGrid
      rows={data && data.length ? data : initialData}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={setNewPage}
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      loading={isFetching}
      rowCount={rowCountState}
      paginationMode="server"
      autoHeight
      onRowClick={(params: GridRowParams) => {
        router.push(routes.dashboardUserRequest(params.id));
      }}
      sx={{
        mx: NEGATIVE_CONTAINER_PX,
        border: 'none',
        borderRadius: 0,
        '& .MuiDataGrid-footerContainer': {
          paddingRight: CONTAINER_PX,
        },
        '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-footerContainer': {
          border: 'none',
        },
        '& .MuiDataGrid-columnHeader:first-child, & .MuiDataGrid-cell:first-child':
          {
            paddingLeft: CONTAINER_PX,
          },
        '& .MuiDataGrid-columnHeader:last-child, & .MuiDataGrid-cell:last-child':
          {
            paddingRight: CONTAINER_PX,
          },
        '.MuiDataGrid-row': {
          cursor: 'pointer',
        },
      }}
    />
  );
}
