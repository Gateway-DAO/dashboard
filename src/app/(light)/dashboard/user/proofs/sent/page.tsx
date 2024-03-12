import { Metadata } from 'next';

import { proofs as proofsLocales } from '@/locale/en/proof';
import { getPrivateApi } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Typography } from '@mui/material';

import ProofsSentTable from './components/proofs-sent-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sent Shared Datas - Gateway Network',
  };
}

export default async function DashboardUserSentProofs() {
  const privateApi = await getPrivateApi();

  const proofs = (await privateApi.sent_proofs({ take: 5, skip: 0 }))
    ?.sentProofs as PartialDeep<Proof>[];
  const count = (await privateApi.count_sent_proofs()).sentProofsCount;

  return (
    <>
      {proofs && proofs.length > 0 && (
        <ProofsSentTable count={count} data={proofs} />
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
    </>
  );
}
