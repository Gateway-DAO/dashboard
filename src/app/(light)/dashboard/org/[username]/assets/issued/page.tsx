import { Session } from 'next-auth';
// import { AppProps } from 'next/app';

import TitleLayout from '@/components/title-layout/title-layout';
import { pdas } from '@/locale/en/pda';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';

import { Box } from '@mui/material';

import PDAsTable from './components/pdas-table';

export default async function OrganizationIssuedAssetsPage(props: any) {
  const session = (await getGtwServerSession()) as Session;
  console.log(props);
  // const pathname = window.location.pathname;
  const pathnameOrg = props.params?.username;
  const organization = session?.user?.accesses?.find(
    (access) => access.organization?.gatewayId === pathnameOrg
  )?.organization;

  const privateApi = await getPrivateApi();
  const issuedPdas =
    (
      await privateApi.issued_pdas_by_org({
        skip: 0,
        take: 5,
        orgId: session?.user?.accesses?.[0].organization.id || '',
      })
    )?.issuedPDAs ?? [];
  // const count = (await privateApi.requestsCount()).requestsReceivedCount;

  return <PDAsTable data={issuedPdas} totalCount={1} />;
}
