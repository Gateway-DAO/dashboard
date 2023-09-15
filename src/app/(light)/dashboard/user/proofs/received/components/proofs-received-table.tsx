'use client';

import { useRouter } from 'next/navigation';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import routes from '@/constants/routes';
import { proofs } from '@/locale/en/proof';
import { Proof } from '@/services/protocol/types';
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
          <GTWAvatar
            name={params.row.verifier!.user?.profilePicture ?? ''}
            size={32}
          />
          <Typography variant="body2">
            {params.row.verifier!.user?.gatewayId}
          </Typography>
        </Stack>
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

export default function ProofsReceivedTable({ data }: Props) {
  const router = useRouter();

  return (
    <DataGrid
      {...defaultGridConfiguration}
      rows={data}
      columns={columns}
      sx={defaultGridCustomization}
      onRowClick={(value) => {
        router.push(routes.dashboardUserProof(value?.id));
      }}
    />
  );
}
