'use client';

import { useState } from 'react';

import {
  defaultGridConfiguration,
  gridWithoutNegativeMargin,
} from '@/components/data-grid/grid-default';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { explorerVerifiers } from '@/locale/en/request-template';
import { apiPublic } from '@/services/protocol/api';
import {
  Explorer_Verifiers_By_Data_Request_TemplateQuery,
  Organization,
  User,
} from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef<
  PartialDeep<{ count: number; verifier: any }>
>[] = [
  {
    field: 'verifier',
    headerName: explorerVerifiers.verifiers,
    flex: 2,
    renderCell(params) {
      return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <GTWAvatar
            name={params.row.verifier?.id}
            alt={params.row.verifier!.gatewayId}
            src={
              (params.row.verifier as User)?.profilePicture ??
              (params.row.verifier as Organization)?.image
            }
            size={32}
          />
          <Typography variant="body2">
            {(params.row.verifier as User)?.displayName ??
              (params.row.verifier as Organization)?.name ??
              params.row.verifier?.gatewayId ??
              limitCharsCentered(params.row.verifier?.id as string, 12)}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'count',
    headerName: explorerVerifiers.data_requests,
    flex: 1,
    valueGetter: (params) => params.row.count,
  },
];

type Props = {
  id: string;
  data: PartialDeep<
    Explorer_Verifiers_By_Data_Request_TemplateQuery['verifiersByDataRequestTemplate']
  >;
  totalCount: number;
};

export default function VerifiersTable({
  id,
  data: initialData,
  totalCount = 0,
}: Props) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['verifiersByDataRequestTemplate', id],
    queryFn: () =>
      apiPublic?.explorer_verifiers_by_data_request_template({
        id,
      }),
    select: (data: any) =>
      (data as Explorer_Verifiers_By_Data_Request_TemplateQuery)
        ?.verifiersByDataRequestTemplate,
    initialData: initialData && initialData.length ? initialData : null,
  });

  const setNewPage = ({ page }: { page: number }) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page ? page : 0,
    }));
  };

  const getRowId = (row: any) => {
    return row.verifier?.id;
  };

  return (
    <>
      <DataGrid
        getRowId={getRowId}
        {...defaultGridConfiguration}
        rows={data && data.length ? data : initialData}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setNewPage}
        loading={isLoading}
        rowCount={totalCount}
        sx={{
          ...gridWithoutNegativeMargin,
          '.MuiDataGrid-row': {
            cursor: 'default',
          },
        }}
      />
    </>
  );
}
