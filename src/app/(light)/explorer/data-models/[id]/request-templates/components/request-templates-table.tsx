'use client';

import { useState } from 'react';

import {
  defaultGridConfiguration,
  gridWithoutNegativeMargin,
} from '@/components/data-grid/grid-default';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { useGtwSession } from '@/context/gtw-session-provider';
import { explorerDataModelRequestTemplates } from '@/locale/en/datamodel';
import {
  Explorer_Issuers_By_Data_ModelQuery,
  Organization,
  User,
} from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef<
  PartialDeep<{ count: number; issuer: any }>
>[] = [
  {
    field: 'issuer',
    headerName: explorerDataModelRequestTemplates.data_request_template,
    flex: 2,
    renderCell(params) {
      return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <GTWAvatar
            name={params.row.issuer?.id}
            alt={params.row.issuer!.gatewayId}
            src={
              (params.row.issuer as User)?.profilePicture ??
              (params.row.issuer as Organization)?.image
            }
            size={32}
          />
          <Typography variant="body2">
            {(params.row.issuer as User)?.displayName ??
              (params.row.issuer as Organization)?.name ??
              params.row.issuer?.gatewayId ??
              limitCharsCentered(params.row.issuer?.id as string, 12)}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'id',
    headerName: explorerDataModelRequestTemplates.data_request_template_id,
    flex: 1,
    valueGetter: (params) => params.row.count,
  },
  {
    field: 'count',
    headerName: explorerDataModelRequestTemplates.data_requests,
    flex: 1,
    valueGetter: (params) => params.row.count,
  },
];

type Props = {
  id: string;
  data: PartialDeep<Explorer_Issuers_By_Data_ModelQuery['issuersByDataModel']>;
  totalCount: number;
};

export default function RequestTemplatesTable({
  id,
  data: initialData,
  totalCount = 0,
}: Props) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { privateApi } = useGtwSession();
  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['requestTemplatesByDataModel', id],
    queryFn: () =>
      privateApi?.explorer_issuers_by_data_model({
        id,
      }),
    select: (data: any) =>
      (data as Explorer_Issuers_By_Data_ModelQuery)?.issuersByDataModel,
    initialData: initialData && initialData.length ? initialData : null,
  });

  const setNewPage = ({ page }: { page: number }) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page ? page : 0,
    }));
  };

  const getRowId = (row: any) => {
    return row.issuer?.id;
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
