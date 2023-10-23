import { Metadata } from 'next';

import RequestTemplatesTable from '@/app/(light)/dashboard/user/request-templates/network/components/request-templates-table';
import { requestTemplates } from '@/locale/en/request-template';
import { getPrivateApi } from '@/services/protocol/api';

import { Typography } from '@mui/material';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Created Data Request Templates - Gateway Network',
  };
}

export default async function DashboardOrgNetworkDataRequestTemplates() {
  const privateApi = await getPrivateApi();
  const requestsData =
    (
      await privateApi.dataRequestTemplates({
        skip: 0,
        take: 5,
      })
    )?.dataRequestTemplates ?? [];

  const count = (await privateApi.dataRequestTemplatesByOrgCount())
    .dataRequestTemplatesCount;

  return (
    <>
      {requestsData && requestsData.length > 0 && (
        <RequestTemplatesTable data={requestsData} totalCount={count} />
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
