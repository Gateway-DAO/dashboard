import { Session } from 'next-auth';

import TitleLayout from '@/components/title-layout/title-layout';
import { pdas } from '@/locale/en/pda';
import { getServerSession } from '@/services/next-auth/get-server-session';
import { getPrivateApi } from '@/services/protocol/api';

import { Box } from '@mui/material';

import PDAsTable from './components/pdas-table';

export default async function OrganizationIssuedAssetsPage() {
  // const session = (await getServerSession()) as Session;
  // const pathname = window.location.pathname;
  // const pathnameOrg = pathname.split('/')[3];
  // const organization = session?.user?.accesses?.find(
  //   (access) => access.organization?.gatewayId === pathnameOrg
  // )?.organization;

  // console.log('ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ', pathname, pathnameOrg, organization);

  // const privateApi = await getPrivateApi();
  // const issuedPdas =
  //   (
  //     await privateApi.issued_pdas_by_org({
  //       skip: 0,
  //       take: 5,
  //       orgId: session?.user?.accesses?.[0].organization.id || '',
  //     })
  //   )?.issuedPDAs ?? [];
  // const count = (await privateApi.requestsCount()).requestsReceivedCount;

  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={pdas.my_data_assets}
        subtitle={pdas.data_assets_subtitle}
        titleId="title-org-assets"
      />
      <PDAsTable />
    </Box>
  );
}
