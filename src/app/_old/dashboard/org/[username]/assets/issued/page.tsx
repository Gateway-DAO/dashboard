import { Metadata } from 'next';

import InstructionGuideHowToIssue from '@/app/(light)/dashboard/components/cards/instruction-guide-how-to-issue';
import TitleLayout from '@/components/title-layout/title-layout';
import { orgPdas } from '@/locale/en/pda';
import { getPrivateApi } from '@/services/protocol/api';
import { OrganizationIdentifierType } from '@/services/protocol/types';

import { Typography } from '@mui/material';

import IssuePdaAction from './components/issue-pda-action';
import PDAsTable from './components/pdas-table';

export const metadata: Metadata = {
  title: 'Issued Data Assets - Gateway Network',
};

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
        <IssuePdaAction pathnameOrg={pathnameOrg} />
      </TitleLayout>
      <InstructionGuideHowToIssue />
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
