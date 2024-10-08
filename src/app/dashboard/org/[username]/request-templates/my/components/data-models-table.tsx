'use client';

import { useState } from 'react';

import ModalDetail from '@/app/dashboard/user/request-templates/components/modal-detail';
import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import { DATE_FORMAT } from '@/constants/date';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { requestTemplate } from '@/locale/en/request-template';
import {
  DataRequestTemplate,
  DataRequestTemplatesByOrgQuery,
  OrganizationIdentifierType,
} from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { useToggle } from '@react-hookz/web';
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

const columns: GridColDef<PartialDeep<DataRequestTemplate>>[] = [
  {
    field: 'name',
    headerName: requestTemplate.title,
    flex: 1.2,
    valueFormatter: (params) => params.value,
    renderCell(params) {
      return <Typography fontWeight={700}>{params.value}</Typography>;
    },
  },
  {
    field: 'id',
    headerName: requestTemplate.data_request_template_id,
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
    field: 'dataRequestsCount',
    headerName: requestTemplate.requests,
    flex: 1.3,
    valueFormatter: (params) => params.value,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1.2,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format(DATE_FORMAT) : '',
  },
];

type Props = {
  data: PartialDeep<DataRequestTemplate>[];
  totalCount: number;
};

export default function RequestTemplatesTable({
  data: initialData,
  totalCount = 0,
}: Props) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [openDetailModal, toggleDetailModal] = useToggle(false);
  const [currentTemplate, setCurrentTemplate] = useState('');

  const { organization } = useOrganization();
  const { privateApi } = useGtwSession();
  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      'data-request-templates',
      organization?.gatewayId as string,
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
    ],
    queryFn: () =>
      privateApi?.dataRequestTemplatesByOrg({
        organization: {
          type: OrganizationIdentifierType.GatewayId,
          value: organization?.gatewayId as string,
        },
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
      }),
    select: (data: any) =>
      (data as DataRequestTemplatesByOrgQuery)?.dataRequestTemplates,
    initialData: initialData && initialData.length ? initialData : null,
    enabled: !!organization,
  });

  const setNewPage = ({ page }: { page: number }) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page ? page : 0,
    }));
  };

  return (
    <>
      <DataGrid
        {...defaultGridConfiguration}
        rows={data && data.length ? data : initialData}
        columns={columns}
        paginationModel={paginationModel}
        onRowClick={(params: GridRowParams) => {
          toggleDetailModal(true);
          setCurrentTemplate(params.id as string);
        }}
        onPaginationModelChange={setNewPage}
        paginationMode="server"
        loading={isLoading}
        rowCount={totalCount}
        sx={defaultGridCustomization}
      />
      <ModalDetail
        open={openDetailModal}
        onClose={toggleDetailModal}
        id={currentTemplate}
      />
    </>
  );
}
