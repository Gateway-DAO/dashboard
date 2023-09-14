'use client';

import { defaultGridCustomization } from '@/components/data-grid/grid-default';
import { PDAStatusChip } from '@/components/pda-card/pda-status-chip';
import AvatarTextCell from '@/components/table-cells/avatar-text-cell';
import { DATE_FORMAT } from '@/constants/date';
import { CredentialStatus } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';

import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export default function PDAsTable({}) {
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
            status={params.row.status ?? CredentialStatus.Invalid}
            size="small"
            variant="outlined"
          />
        );
      },
    },
  ];

  const rows = [
    {
      id: '123',
      dataAsset: 'Credit Score',
      owner: {
        user: {
          gatewayId: 'Ishita Choudhary',
        },
      },
      dataModelId: 'e3ffee1f-0836-4851-a862-d9d9de9d49a8',
      issuanceDate: '2023-09-04 18:50:48.888',
      status: 'Valid',
    },
    {
      id: '124',
      dataAsset: 'Credit Score',
      owner: {
        user: {
          gatewayId: 'gatewayid',
        },
      },
      dataModelId: '151ace14-d1ce-4c37-88a2-cd0359576b9e',
      issuanceDate: '2023-09-04 18:50:48.888',
      status: 'Valid',
    },
    {
      id: '125',
      dataAsset: 'Credit Score',
      owner: {
        user: {
          gatewayId: 'gatewayid',
        },
      },
      dataModelId: '350a7efe-aef0-45d8-9932-c670267203c7',
      issuanceDate: '2023-09-04 18:50:48.888',
      status: 'Valid',
    },
    {
      id: '126',
      dataAsset: 'Credit Score',
      owner: {
        user: {
          gatewayId: 'gatewayid',
        },
      },
      dataModelId: '82f9bbf8-69a5-4bd3-a886-2711df0005b0',
      issuanceDate: '2023-09-04 18:50:48.888',
      status: 'Valid',
    },
    {
      id: '127',
      dataAsset: 'Credit Score',
      owner: {
        user: {
          gatewayId: 'gatewayid',
        },
      },
      dataModelId: 'e3ffee1f-0836-4851-a862-d9d9de9d49a8',
      issuanceDate: '2023-09-04 18:50:48.888',
      status: 'Valid',
    },
    {
      id: '128',
      dataAsset: 'Credit Score',
      owner: {
        user: {
          gatewayId: 'gatewayid',
        },
      },
      dataModelId: '82f9bbf8-69a5-4bd3-a886-2711df0005b0',
      issuanceDate: '2023-09-04 18:50:48.888',
      status: 'Valid',
    },
    {
      id: '129',
      dataAsset: 'Credit Score',
      owner: {
        user: {
          gatewayId: 'gatewayid',
        },
      },
      dataModelId: '151ace14-d1ce-4c37-88a2-cd0359576b9e',
      issuanceDate: '2023-09-04 18:50:48.888',
      status: 'Valid',
    },
    {
      id: '130',
      dataAsset: 'Credit Score',
      owner: {
        user: {
          gatewayId: 'gatewayid',
        },
      },
      dataModelId: '350a7efe-aef0-45d8-9932-c670267203c7',
      issuanceDate: '2023-09-04 18:50:48.888',
      status: 'Valid',
    },
    {
      id: '131',
      dataAsset: 'Credit Score',
      owner: {
        user: {
          gatewayId: 'gatewayid',
        },
      },
      dataModelId: '82f9bbf8-69a5-4bd3-a886-2711df0005b0',
      issuanceDate: '2023-09-04 18:50:48.888',
      status: 'Valid',
    },
  ];

  return (
    <DataGrid
      {...defaultGridCustomization}
      rows={rows}
      columns={columns}
      sx={defaultGridCustomization}
    />
  );
}
