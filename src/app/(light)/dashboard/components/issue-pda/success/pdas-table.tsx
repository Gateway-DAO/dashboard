'use client';

import { useRouter } from 'next-nprogress-bar';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import AvatarTextCell from '@/components/table-cells/avatar-text-cell';
import { TextStatusChip } from '@/components/text-status-chip/text-status-chip';
import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { pdas } from '@/locale/en/pda';
import { PdaStatus, PrivateDataAsset } from '@/services/protocol/types';
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

export default function PDAsTable({ data: initialData, totalCount }: Props) {
  const columns: GridColDef[] = [
    {
      field: 'dataAsset',
      headerName: pdas.data_asset,
      flex: 1.3,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography variant="body1" fontWeight={700}>
            {params.row.dataAsset.title}
          </Typography>
        );
      },
    },
    {
      field: 'owner',
      headerName: pdas.recipient,
      flex: 1.3,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <AvatarTextCell
            userId={params.row.dataAsset?.owner?.id}
            name={
              params.row.dataAsset?.owner?.displayName ??
              params.row.dataAsset?.owner?.gatewayId ??
              params.row.dataAsset?.owner?.id
            }
            picture={params.row.dataAsset?.owner?.profilePicture ?? null}
          />
        );
      },
    },
    {
      field: 'status',
      headerName: pdas.status,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <TextStatusChip
            status={params.row.status ?? PdaStatus.Valid}
            size="small"
            variant="outlined"
          />
        );
      },
    },
  ];

  const router = useRouter();

  const { isOrg, organization } = useOrganization();

  return (
    <DataGrid
      {...defaultGridConfiguration}
      rows={initialData}
      columns={columns}
      rowCount={totalCount}
      hideFooterPagination
      sx={defaultGridCustomization}
      onRowClick={(params: GridRowParams) => {
        router.push(
          isOrg
            ? routes.dashboard.org.asset(organization?.gatewayId, params.id)
            : routes.dashboard.user.asset(params.id)
        );
      }}
    />
  );
}
