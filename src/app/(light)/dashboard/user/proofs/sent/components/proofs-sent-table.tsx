'use client';

import { useRouter } from 'next/navigation';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import routes from '@/constants/routes';
import { proofs } from '@/locale/en/proof';
import { Proof } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<PartialDeep<Proof>>[] = [
  {
    field: 'verifier',
    headerName: proofs.verifier,
    flex: 1,
    valueGetter: (params) => params.row.verifier?.user?.gatewayId,
    renderCell(params) {
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <GTWAvatar name={''} size={32} />
          <Typography variant="body2">
            {params.row.verifier!.user?.gatewayId}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'requestId',
    headerName: proofs.request_id,
    flex: 1,
    valueGetter: (params) => params.row.dataRequest?.id,
    renderCell(params) {
      return limitCharsCentered(params.row.dataRequest?.id as string, 12);
    },
  },
  {
    field: 'dataRequestTemplateId',
    headerName: proofs.request_template_id,
    flex: 1,
    valueGetter: (params) => params.row.dataRequest?.dataRequestTemplate?.id,
    renderCell(params) {
      return limitCharsCentered(
        params.row.dataRequest?.dataRequestTemplate?.id as string,
        12
      );
    },
  },
  {
    field: 'shareDate',
    headerName: proofs.share_date,
    flex: 1,
    valueFormatter: (params) =>
      dayjs(params.value).format('MM/DD/YYYY, h:mm A'),
  },
  {
    field: 'dataAmount',
    headerName: proofs.data_amount,
    type: 'number',
    flex: 1,
    valueGetter: (params) => params.row.data?.PDAs?.length,
  },
];

type Props = {
  data: PartialDeep<Proof>[];
};

export default function ProofsSentTable({ data }: Props) {
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
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      disableDensitySelector
      pageSizeOptions={[5, 10]}
      autoHeight
      onRowClick={(value) => {
        router.push(routes.dashboardUserProof(value?.id));
      }}
      sx={{
        mx: NEGATIVE_CONTAINER_PX,
        border: 'none',
        borderRadius: 0,
        '& .MuiDataGrid-row': {
          cursor: 'pointer',
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
      }}
    />
  );
}
