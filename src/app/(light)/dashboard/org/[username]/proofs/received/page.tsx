import TitleLayout from '@/components/title-layout/title-layout';
import { proofs as proofsLocales } from '@/locale/en/proof';
import { getPrivateApi } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Box, Typography } from '@mui/material';

import ProofsReceivedTable from './components/org-proofs-received-table';

export default async function OrganizationReceivedProofsPage() {
  const privateApi = await getPrivateApi();

  const proofs = (await privateApi.received_proofs({ take: 5, skip: 0 }))
    ?.receivedProofs as PartialDeep<Proof>[];
  const count = (await privateApi.countReceivedProofs()).receivedProofsCount;

  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={proofsLocales.received_proofs}
        subtitle={proofsLocales.received_proofs_subtitle}
        titleId="title-org-proofs"
      />

      <Box>
        {proofs && proofs.length > 0 && (
          <ProofsReceivedTable data={proofs} count={count} />
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
