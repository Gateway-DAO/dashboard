import { Metadata } from 'next';

import { getPrivateApi } from '@/services/protocol/api';
import { OrganizationIdentifierType } from '@/services/protocol/types';

import { Typography } from '@mui/material';

import RequestsTable from './components/requests-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Issued Data Requests - Gateway Network',
  };
}

export default async function OrganizationRequestsPage(props: any) {
  const privateApi = await getPrivateApi();
  const pathnameOrg = props.params?.username;

  const requestsData =
    (
      await privateApi.requestsByOrg({
        skip: 0,
        take: 5,
        verifierOrganization: {
          type: OrganizationIdentifierType.GatewayId,
          value: pathnameOrg,
        },
      })
    )?.requestsSent ?? [];

  const count = (
    await privateApi.requestsByOrgCount({
      verifierOrganization: {
        type: OrganizationIdentifierType.GatewayId,
        value: pathnameOrg,
      },
    })
  ).requestsSentCount;

  return (
    <>
      {requestsData && requestsData.length > 0 ? (
        <RequestsTable data={requestsData} totalCount={count} />
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          No data requests yet
        </Typography>
      )}
    </>
  );
}
