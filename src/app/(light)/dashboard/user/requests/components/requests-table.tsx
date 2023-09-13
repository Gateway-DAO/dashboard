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
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<PartialDeep<DataRequest>>[] = [
  {
    field: 'id',
    headerName: 'Request ID',
    flex: 1,
    valueGetter: (params) => params.row.id,
  },
  {
    field: 'userVerifier',
    headerName: 'Requested By',
    flex: 1,
    valueGetter: (params) => params.row.userVerifier?.gatewayId,
    renderCell(params) {
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
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
    flex: 1,
    valueGetter: (params) => params.row.dataRequestTemplate?.id,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    type: 'number',
    flex: 1,
    valueFormatter: (params) => dayjs(params.value).format(DATE_FORMAT),
  },
  {
    field: 'status',
    headerName: 'status',
    type: 'number',
    flex: 1,
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
      disableDensitySelector
      loading={isFetching}
      rowCount={rowCountState}
      paginationMode="server"
      autoHeight
      onCellClick={({ field, value }) => {
        if (field === 'id') {
          router.push(routes.dashboardUserRequest(value as string));
        }
      }}
      sx={{
        mx: NEGATIVE_CONTAINER_PX,
        border: 'none',
        borderRadius: 0,
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
        '.MuiDataGrid-cell[data-field="id"]': {
          cursor: 'pointer',
        },
      }}
    />
  );
}
