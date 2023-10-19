import { Metadata } from 'next';

import { requestTemplates } from '@/locale/en/request-template';
import { getPrivateApi } from '@/services/protocol/api';

import { Typography } from '@mui/material';

import DataModelsTable from './components/request-templates-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Data Request Templates - Gateway Network',
  };
}

export default async function DashboardUserMyRequestTemplates() {
  const privateApi = await getPrivateApi();
  const requestsData =
    (
      await privateApi.dataRequestTemplates({
        skip: 0,
        take: 5,
      })
    )?.dataRequestTemplates ?? [];
  const count = (await privateApi.dataRequestTemplatesCount())
    .myDataRequestTemplatesCount;

  return (
    <>
      {requestsData && requestsData.length > 0 && (
        <DataModelsTable data={requestsData} totalCount={count} />
      )}
      {requestsData && requestsData.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {requestTemplates.empty}
        </Typography>
      )}
    </>
  );
}
