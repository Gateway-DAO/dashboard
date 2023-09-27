import { Session } from 'next-auth';
// import { AppProps } from 'next/app';

import { orgPdas } from '@/locale/en/pda';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';

import { Typography } from '@mui/material';

import PDAsTable from './components/pdas-table';

export default async function OrganizationIssuedAssetsPage(props: any) {
  const session = (await getGtwServerSession()) as Session;
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
        orgId: organization?.id || '',
      })
    )?.issuedPDAs ?? [];
  const count = (
    await privateApi.countIssuedPdasByOrg({ orgId: organization?.id || '' })
  ).issuedPDAsCount;

  return (
    <>
      {issuedPdas && issuedPdas.length > 0 && (
        <PDAsTable data={issuedPdas} totalCount={count} />
      )}
      {issuedPdas && issuedPdas.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {orgPdas.empty}
        </Typography>
      )}
    </>
  );
}
