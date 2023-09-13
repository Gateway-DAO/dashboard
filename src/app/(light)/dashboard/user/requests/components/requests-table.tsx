'use client';

import { useRouter } from 'next/navigation';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import RequestStatusChip from '@/components/requests/request-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { DataRequest } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
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
  loading?: boolean;
};

export default function RequestsTable({ data, loading = false }: Props) {
  const router = useRouter();

  return (
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      loading={loading}
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      disableDensitySelector
      pageSizeOptions={[5, 10]}
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
