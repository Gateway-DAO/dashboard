import { Metadata } from 'next';

import DataOutlinedIcon from '@/components/icons/data-outlined';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { orgPdas, pdas } from '@/locale/en/pda';
import { getPrivateApi } from '@/services/protocol/api';
import { OrganizationIdentifierType } from '@/services/protocol/types';

import { Button, Typography } from '@mui/material';

import PDAsTable from './components/pdas-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Issued Data Assets - Gateway Network',
  };
}

export default async function OrganizationIssuedAssetsPage(props: any) {
  const pathnameOrg = props.params?.username;

  const privateApi = await getPrivateApi();
  const issuedPdas =
    (
      await privateApi.issued_pdas_by_org({
        skip: 0,
        take: 5,
        organization: {
          type: OrganizationIdentifierType.GatewayId,
          value: pathnameOrg,
        },
      })
    )?.issuedPDAs ?? [];
  const count = (
    await privateApi.countIssuedPdasByOrg({
      organization: {
        type: OrganizationIdentifierType.GatewayId,
        value: pathnameOrg,
      },
    })
  ).issuedPDAsCount;

  return (
    <>
      <TitleLayout
        title={orgPdas.data_assets_title}
        subtitle={orgPdas.data_assets_subtitle}
        titleId="title-org-assets"
      >
        <Button
          variant="contained"
          size="large"
          endIcon={<DataOutlinedIcon />}
          href={routes.dashboard.org.issue(pathnameOrg)}
        >
          {pdas.issue_a_pda}
        </Button>
      </TitleLayout>
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
