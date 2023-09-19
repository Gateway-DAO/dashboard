'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { queries } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import { proofs } from '@/locale/en/proof';
import { Proof } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<PartialDeep<Proof>>[] = [
  {
    field: 'verifier',
    headerName: proofs.verifier,
    flex: 1,
    valueGetter: (params) => params.row.verifier?.gatewayId,
    renderCell(params) {
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <GTWAvatar
            name={params.row.verifier?.profilePicture ?? ''}
            size={32}
          />
          <Typography variant="body2">
            {params.row.verifier?.displayName ??
              params.row.verifier?.gatewayId ??
              params.row.verifier?.id}
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
  count: number;
};

export default function ProofsSentTable({
  data: initialData,
  count = 0,
}: Props) {
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { privateApi } = useGtwSession();
  const { data, isFetching } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      queries.proofs_sent,
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
    ],
    queryFn: () =>
      privateApi?.received_proofs({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
      }),
    select: (data: any) => data?.sentProofs,
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
      paginationModel={paginationModel}
      loading={isFetching}
      onPaginationModelChange={setNewPage}
      columns={columns}
      rowCount={count}
      sx={defaultGridCustomization}
      onRowClick={(value) => {
        router.push(routes.dashboardUserProof(value?.id));
      }}
    />
  );
}
