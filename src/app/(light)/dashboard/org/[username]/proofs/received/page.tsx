import { Metadata } from 'next';

import TitleLayout from '@/components/title-layout/title-layout';
import { proofs as proofsLocales } from '@/locale/en/proof';
import { getPrivateApi } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';
import { getCurrentOrg } from '@/utils/currentOrg';
import { PartialDeep } from 'type-fest';

import { Box, Typography } from '@mui/material';

import OrganizationProofsReceivedTable from './components/org-proofs-received-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Received Data Proofs - Gateway Network',
  };
}

export default async function OrganizationReceivedProofsPage(props: any) {
  const privateApi = await getPrivateApi();
  const pathnameOrg = await props.params?.username;
  const organization = await getCurrentOrg(pathnameOrg);

  const proofs = (
    await privateApi.received_proofs_by_org({
      take: 5,
      skip: 0,
      organizationId: organization?.id as string,
    })
  )?.receivedProofs as PartialDeep<Proof>[];
  const count = (
    await privateApi.countReceivedProofsByOrg({
      organizationId: organization?.id as string,
    })
  ).receivedProofsCount;

  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={proofsLocales.received_proofs}
        subtitle={proofsLocales.received_proofs_subtitle}
        titleId="title-org-proofs"
      />

      <Box>
        {proofs && proofs.length > 0 && (
          <OrganizationProofsReceivedTable data={proofs} count={count} />
        )}
        {proofs && proofs.length === 0 && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', width: '100%' }}
          >
            {proofsLocales.empty}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
