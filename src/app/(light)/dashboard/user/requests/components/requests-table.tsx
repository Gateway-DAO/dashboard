'use client';

import Link from 'next/link';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import RequestStatusChip from '@/components/requests/request-status-chip';
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
    renderCell(params) {
      return (
        <Link href={routes.dashboardUserRequest(params.row.id)}>
          {params.row.id}
        </Link>
      );
    },
  },
  {
    field: 'userVerifier',
    headerName: 'Requested By',
    flex: 1,
    valueGetter: (params) => params.row.userVerifier?.gatewayId,
    renderCell(params) {
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <GTWAvatar name={params.row.userVerifier!.gatewayId!} size={32} />
          <Typography variant="body2">
            {params.row.userVerifier!.gatewayId}
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
    valueFormatter: (params) =>
      dayjs(params.value).format('MM/DD/YYYY, h:mm A'),
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

export default function RequestsTable({ data }: Props) {
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
      pageSizeOptions={[10, 25, 50, 100]}
      autoHeight
      sx={{
        mx: NEGATIVE_CONTAINER_PX,
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
        '& .MuiDataGrid-columnHeader:first-child, & .MuiDataGrid-cell:first-child':
          {
            paddingLeft: CONTAINER_PX,
          },
        '& .MuiDataGrid-columnHeader:last-child, & .MuiDataGrid-cell:last-child':
          {
            paddingRight: CONTAINER_PX,
          },
      }}
    />
  );
}
