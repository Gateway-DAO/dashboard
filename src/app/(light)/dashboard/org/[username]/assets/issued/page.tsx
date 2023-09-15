import { Session } from 'next-auth';

import TitleLayout from '@/components/title-layout/title-layout';
import { pdas } from '@/locale/en/pda';
import { getServerSession } from '@/services/next-auth/get-server-session';
import { getPrivateApi } from '@/services/protocol/api';

import { Box } from '@mui/material';

import PDAsTable from './components/pdas-table';

export default async function OrganizationIssuedAssetsPage() {
  const session = (await getServerSession()) as Session;

  const privateApi = await getPrivateApi();
  const issuedPdas =
    (
      await privateApi.issued_pdas_by_org({
        skip: 0,
        take: 5,
        orgId: session?.user?.accesses?.[0].organization.id || '',
      })
    )?.issuedPDAs ?? [];
  const count = (await privateApi.requestsCount()).requestsReceivedCount;

  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={pdas.my_data_assets}
        subtitle={pdas.data_assets_subtitle}
        titleId="title-org-assets"
      />
      <PDAsTable data={issuedPdas} totalCount={count} />
    </Box>
  );
}
