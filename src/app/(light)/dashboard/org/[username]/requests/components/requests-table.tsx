'use client';

import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import RequestStatusChip from '@/components/requests/request-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { DataRequest, RequestsByOrgQuery } from '@/services/protocol/types';
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
    field: 'verifier',
    headerName: 'Requested By',
    flex: 1.3,
    renderCell(params) {
      return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <GTWAvatar name={params.row.verifier!.gatewayId! || ''} size={32} />
          <Typography variant="body2">
            {params.row.verifier?.gatewayId}
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
  totalCount: number;
};

export default function OrgRequestsTable({
  data: initialData,
  totalCount = 0,
}: Props) {
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { privateApi } = useGtwSession();
  const { organization } = useOrganization();

  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      'data-requests-received',
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
    ],
    queryFn: () =>
      privateApi?.requestsByOrg({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
        orgId: organization?.id || '',
      }),
    select: (data: any) => (data as RequestsByOrgQuery)?.requestsSent,
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
      {...defaultGridConfiguration}
      rows={data && data.length ? data : initialData}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={setNewPage}
      paginationMode="server"
      loading={isLoading}
      rowCount={totalCount}
      onRowClick={(params: GridRowParams) => {
        router.push(routes.dashboardUserRequest(params.id));
      }}
      sx={defaultGridCustomization}
    />
  );
}
