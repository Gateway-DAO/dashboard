'use client';

import { useRouter } from 'next-nprogress-bar';
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
import { Proof, Sent_ProofsQuery } from '@/services/protocol/types';
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
    flex: 1.4,
    valueGetter: (params) => params.row.verifier?.gatewayId,
    renderCell(params) {
      const hasOrg = !!params.row.verifierOrganization;
      return (
        <Stack direction="row" alignItems="center" gap={2}>
          <GTWAvatar
            name={
              hasOrg
                ? params.row.verifierOrganization?.id
                : params.row.verifier?.id
            }
            alt={
              hasOrg
                ? params.row.verifierOrganization?.name ?? ''
                : params.row.verifier?.displayName ?? ''
            }
            src={
              hasOrg
                ? params.row.verifierOrganization?.image
                : params.row.verifier?.profilePicture
            }
            size={32}
          />
          <Typography fontWeight={700}>
            {hasOrg
              ? params.row.verifierOrganization?.name ??
                params.row.verifierOrganization?.gatewayId ??
                limitCharsCentered(
                  params.row.verifierOrganization?.id as string,
                  12
                )
              : params.row.verifier?.displayName ??
                params.row.verifier?.gatewayId ??
                limitCharsCentered(params.row.verifier?.id as string, 12)}
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
      return (
        limitCharsCentered(params.row.dataRequest?.id as string, 12) || '-'
      );
    },
  },
  {
    field: 'dataRequestTemplateId',
    headerName: proofs.request_template_id,
    flex: 1,
    valueGetter: (params) => params.row.dataRequest?.dataRequestTemplate?.id,
    renderCell(params) {
      return (
        limitCharsCentered(
          params.row.dataRequest?.dataRequestTemplate?.id as string,
          12
        ) || '-'
      );
    },
  },
  {
    field: 'createdAt',
    headerName: proofs.share_date,
    flex: 1,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format('MM/DD/YYYY, h:mm A') : '',
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
  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      queries.proofs_sent,
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
    ],
    queryFn: () =>
      privateApi?.sent_proofs({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
      }),
    select: (data: any) => (data as Sent_ProofsQuery)?.sentProofs,
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
      loading={isLoading}
      onPaginationModelChange={setNewPage}
      columns={columns}
      rowCount={count}
      sx={defaultGridCustomization}
      onRowClick={(value) => {
        router.push(routes.dashboard.user.sharedData(value?.id));
      }}
    />
  );
}
