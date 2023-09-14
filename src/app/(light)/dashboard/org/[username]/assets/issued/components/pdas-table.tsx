'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { defaultGridCustomization } from '@/components/data-grid/grid-default';
import { PDAStatusChip } from '@/components/pda-card/pda-status-chip';
import AvatarTextCell from '@/components/table-cells/avatar-text-cell';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { useSession } from '@/context/session-provider';
import useOrganization from '@/hooks/use-organization';
import { PdaStatus } from '@/services/protocol/types';
import { PrivateDataAsset } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
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

type Props = {
  data: PartialDeep<PrivateDataAsset>[];
  totalCount: number;
};

export default function PDAsTable({
  data: initialData,
  totalCount = 0,
}: Props) {
  const columns: GridColDef[] = [
    {
      field: 'dataAsset',
      headerName: 'Data asset',
      flex: 1.3,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography variant="body1" fontWeight={700}>
            {params.row.dataAsset}
          </Typography>
        );
      },
    },
    {
      field: 'owner',
      headerName: 'Recipient',
      flex: 1.3,
      renderCell: (params: GridRenderCellParams) => {
        return <AvatarTextCell name={params.row.owner?.user?.gatewayId} />;
      },
    },
    {
      field: 'dataModelId',
      headerName: 'Data model ID',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography variant="body1">
            {limitCharsCentered(params.row.dataModelId, 6)}
          </Typography>
        );
      },
    },
    {
      field: 'issuanceDate',
      headerName: 'Issuance date',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography>
            {dayjs(params.row.issuanceDate).format(DATE_FORMAT)}
          </Typography>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <PDAStatusChip
            status={params.row.status ?? PdaStatus.Valid}
            size="small"
            variant="outlined"
          />
        );
      },
    },
  ];

  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { organization } = useOrganization();

  const { privateApi } = useSession();
  const { data, isFetching } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      'issued-data-assets-by-org',
      organization?.id,
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
    ],
    queryFn: () =>
      privateApi?.issued_pdas_by_org({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
        orgId: organization?.id || '',
      }),
    select: (data: any) => data?.issuedPdas,
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
      {...defaultGridCustomization}
      rows={data}
      columns={columns}
      rowCount={totalCount}
      paginationModel={paginationModel}
      onPaginationModelChange={setNewPage}
      paginationMode="server"
      loading={isFetching}
      sx={defaultGridCustomization}
      onRowClick={(params: GridRowParams) => {
        router.push(routes.dashboardUserAsset(params.id));
      }}
    />
  );
}
